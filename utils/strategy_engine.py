import pandas as pd

def _calculate_metrics(model, base_df, price, ad_spend, discount):
    """
    Internal helper to compute sales, revenue, profit, ROI
    """

    temp_df = base_df.copy()
    temp_df["ad_spend"] = ad_spend
    temp_df["discount"] = discount

    # Ensure correct feature order
    temp_df = temp_df[model.feature_names_in_]

    sales = float(model.predict(temp_df)[0])
    revenue = sales * price
    profit = revenue - ad_spend
    roi = profit / ad_spend if ad_spend > 0 else 0

    return {
        "sales": round(sales, 2),
        "profit": round(profit, 2),
        "roi": round(roi, 2)
    }


def evaluate_growth_strategies(model, base_df, price):
    """
    Evaluates Conservative, Balanced, and Aggressive strategies
    using business logic + ML predictions
    """

    # ----------------------------
    # Strategy Definitions
    # ----------------------------
    strategy_definitions = [
        {
            "name": "Conservative",
            "objective": "Maximize ROI",
            "ad_spend": 10000,
            "discount": 0,
            "best_for": "Profit-focused businesses",
            "tradeoff": "Slower growth"
        },
        {
            "name": "Balanced",
            "objective": "Sustainable growth",
            "ad_spend": 14000,
            "discount": 5,
            "best_for": "Scaling businesses",
            "tradeoff": "Requires monitoring"
        },
        {
            "name": "Aggressive",
            "objective": "Maximize reach",
            "ad_spend": 18000,
            "discount": 10,
            "best_for": "Market expansion",
            "tradeoff": "Lower efficiency"
        }
    ]

    strategies_output = []

    for strat in strategy_definitions:
        metrics = _calculate_metrics(
            model=model,
            base_df=base_df,
            price=price,
            ad_spend=strat["ad_spend"],
            discount=strat["discount"]
        )

        roi = metrics["roi"]

        # ----------------------------
        # Risk Classification
        # ----------------------------
        if roi >= 350:
            risk = "Low"
            stop_condition = "ROI drops below 300"
        elif roi >= 250:
            risk = "Medium"
            stop_condition = "ROI plateaus"
        else:
            risk = "High"
            stop_condition = "Sharp ROI decline"

        strategies_output.append({
            "name": strat["name"],
            "objective": strat["objective"],
            "ad_spend": strat["ad_spend"],
            "discount": strat["discount"],
            "sales": metrics["sales"],
            "profit": metrics["profit"],
            "roi": metrics["roi"],
            "risk": risk,
            "best_for": strat["best_for"],
            "stop_condition": stop_condition,
            "tradeoff": strat["tradeoff"]
        })

    return strategies_output
