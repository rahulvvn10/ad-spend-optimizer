# Ad Spend Optimization and What-If Scenario Analysis using Machine Learning
## Project Overview

Digital businesses invest heavily in online advertising without clear visibility into optimal budget levels, discount profitability, or return on investment. Poor advertising decisions lead to inefficient budget utilization, low conversion rates, and reduced profitability.

This project presents a machine learning based decision support system that enables advertisers and business owners to simulate multiple what-if scenarios and evaluate outcomes before allocating advertising budgets.

## Problem Statement

Businesses often lack predictive insights to determine how much to spend on advertising, when to stop spending, and which strategies yield the highest return on investment. Decisions made without analytical support result in wasted marketing spend and reduced effectiveness.

Objectives

Predict sales outcomes based on advertising parameters

Perform what-if scenario analysis by varying ad spend, discount levels, targeting strength, and creative quality

Identify ROI-optimal ranges and stop-spend zones

Support informed budget allocation decisions

Visualize relationships between ad spend, profit, and ROI

## Proposed Solution

The proposed system is a machine learning powered web application that accepts user-controlled marketing inputs, predicts sales outcomes using a trained model, and evaluates multiple advertising scenarios. Business rules such as budget caps and minimum ROI thresholds are applied to generate actionable insights and visualizations.

System Architecture
User Interface (React)
        ↓
What-If Input Controls
        ↓
Flask API
        ↓
Random Forest Model
        ↓
Scenario Simulation Engine
        ↓
Decision Insights and Visualizations

Technology Stack
Frontend

React

JavaScript

CSS

Backend

Flask

Flask-CORS

Pandas

Joblib

Machine Learning

Random Forest Regressor

Feature engineering

Scenario simulation

### Machine Learning Approach

The model is trained on a structured advertising dataset. Input features include ad spend, discount, landing page quality, targeting strength, and creative quality. The output of the model is predicted sales, from which revenue, profit, and return on investment are derived.

The model is used strictly for decision support and does not automate advertising actions.

### Key Features

Multi-feature what-if analysis

ROI versus ad spend visualization

Budget cap enforcement

Stop-spend detection

Minimum ROI warning system

Strategy comparison logic

Interactive slider-based interface

### Real-World Relevance

The system mirrors real-world advertising planning processes used by marketing teams and agencies. It allows evaluation of campaign strategies and budget levels prior to real deployment, improving decision quality and reducing financial risk.

## Limitations

Model performance depends on dataset quality

Predictions are approximate rather than guaranteed

The model is not trained on real-time advertising data

Assumes stable market conditions

## Future Enhancements

Integration with real advertising platforms such as Google Ads and Meta Ads

User-specific model retraining

Time-series modeling for performance trends

Competitor benchmarking

Recommendation engine for strategy optimization

## Conclusion

This project demonstrates the effective use of machine learning for advertising decision support through scenario-based analysis and business-aware insights. It bridges predictive modeling with practical decision-making, enabling more informed and efficient advertising strategies.
