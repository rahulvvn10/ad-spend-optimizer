import pandas as pd

BUDGET_CAP = 18000

def generate_what_if_curve(model, base_df):
    PRICE = float(base_df["price"].values[0])
    ad_spend_range = range(3000, 25001, 2000)
    curve = []

    for spend in ad_spend_range:
        temp = base_df.copy()
        temp["ad_spend"] = int(spend)

        sales = float(model.predict(temp)[0])
        revenue = sales * PRICE
        profit = revenue - spend
        roi = profit / spend if spend > 0 else 0

        curve.append({
            "ad_spend": int(spend),
            "sales": round(sales, 2),
            "profit": round(profit, 2),
            "roi": round(roi, 2)
        })

    return pd.DataFrame(curve)

def calculate_stop_spend(curve_df):
    return int(curve_df.loc[curve_df["roi"].idxmax(), "ad_spend"])

def calculate_recommended_spend(curve_df):
    max_profit = curve_df["profit"].max()
    tolerance = 0.02 * max_profit  # 2% tolerance

    valid = curve_df[curve_df["profit"] >= (max_profit - tolerance)]
    return int(valid.iloc[0]["ad_spend"])
