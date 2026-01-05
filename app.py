from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.strategy_engine import evaluate_growth_strategies
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# ------------------------
# LOAD MODEL
# ------------------------
model = joblib.load("model/model.pkl")

BUDGET_CAP = 18000
MIN_ACCEPTABLE_ROI = 200

# ------------------------
# USER → MODEL FEATURE MAPPER
# ------------------------
def map_user_inputs(data):
    targeting_level = data["targeting_level"]  # 1,2,3
    creative_level = data["creative_level"]    # 1,2

    return {
        "price": data["price"],
        "discount": data["discount"],
        "ad_spend": data["ad_spend"],
        "page_quality": data["page_quality"],

        # Targeting (derived one-hot)
        "targeting_low": 1 if targeting_level == 1 else 0,
        "targeting_medium": 1 if targeting_level == 2 else 0,

        # Creative (derived)
        "creative_offer": 1 if creative_level == 2 else 0,
        "creative_urgency": 0,

        # Static for now
        "region_low": 0
    }


# ------------------------
# ANALYZE ENDPOINT
# ------------------------
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json

    # ---- Build model input ----
    mapped = map_user_inputs(data)
    base_df = pd.DataFrame([mapped])
    base_df = base_df[model.feature_names_in_]

    PRICE = data["price"]

    # ---- USER WHAT-IF ----
    sales = float(model.predict(base_df)[0])
    revenue = sales * PRICE
    profit = revenue - data["ad_spend"]
    roi = profit / data["ad_spend"] if data["ad_spend"] > 0 else 0

    # ---- ROI ZONE ----
    if roi >= MIN_ACCEPTABLE_ROI:
        roi_zone = "safe"
    elif roi >= MIN_ACCEPTABLE_ROI * 0.75:
        roi_zone = "warning"
    else:
        roi_zone = "risk"

    user_what_if = {
        "sales": round(sales, 2),
        "revenue": round(revenue, 2),
        "profit": round(profit, 2),
        "roi": round(roi, 2),
        "roi_zone": roi_zone
    }

    # ---- WHAT-IF CURVE (Ad Spend Sweep) ----
    curve = []
    for spend in range(3000, 25001, 2000):
        temp = base_df.copy()
        temp["ad_spend"] = spend

        s = float(model.predict(temp)[0])
        r = s * PRICE
        p = r - spend
        roi_val = p / spend if spend > 0 else 0

        curve.append({
            "ad_spend": spend,
            "sales": round(s, 2),
            "profit": round(p, 2),
            "roi": round(roi_val, 2)
        })

    curve_df = pd.DataFrame(curve)

    # ---- STOP-SPEND (BUSINESS-CORRECT LOGIC) ----
    stop_spend = None
    for i in range(1, len(curve_df)):
        if (
            curve_df.loc[i - 1, "roi"] >= MIN_ACCEPTABLE_ROI
            and curve_df.loc[i, "roi"] < MIN_ACCEPTABLE_ROI
        ):
            stop_spend = int(curve_df.loc[i, "ad_spend"])
            break

    # Fallback: max ROI point
    if stop_spend is None:
        stop_spend = int(curve_df.loc[curve_df["roi"].idxmax(), "ad_spend"])

    # ---- RECOMMENDED SPEND ----
    recommended_spend = min(stop_spend, BUDGET_CAP)

    # ---- DECISION INSIGHT MESSAGE ----
    if data["ad_spend"] > recommended_spend:
        insight_message = "⚠ You are operating beyond the ROI-optimal range."
    elif roi_zone == "safe":
        insight_message = "✅ Your current spend is within the safe ROI range."
    elif roi_zone == "warning":
        insight_message = "⚠ ROI is declining. Monitor performance closely."
    else:
        insight_message = "🔴 High risk spend. ROI is below acceptable levels."

    # ---- RESPONSE ----
    return jsonify({
        "user_what_if": user_what_if,
        "recommended_spend": recommended_spend,
        "stop_spend": stop_spend,
        "budget_cap": BUDGET_CAP,
        "min_acceptable_roi": MIN_ACCEPTABLE_ROI,
        "insight_message": insight_message,
        "what_if_curve": curve
    })

@app.route("/strategies", methods=["POST"])
def strategies():
    data = request.json

    # ---- Build base input ----
    mapped = map_user_inputs(data)
    base_df = pd.DataFrame([mapped])
    base_df = base_df[model.feature_names_in_]

    PRICE = data["price"]

    # ---- Evaluate strategies ----
    strategies = evaluate_growth_strategies(
        model=model,
        base_df=base_df,
        price=PRICE
    )

    return jsonify({
        "strategies": strategies
    })


if __name__ == "__main__":
    app.run(debug=True)
