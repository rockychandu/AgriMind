# 🌾 AgriMind — AI Agricultural Decision Support Platform

![AgriMind Architecture](https://img.shields.io/badge/Python-3.9%2B-blue.svg)
![AgriMind Platform](https://img.shields.io/badge/AgriMind-Production-brightgreen.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**AgriMind** is an enterprise-grade agricultural decision engine platform (>70,000 LOC Python core engine) engineered to provide smallholder and commercial farmers with real-time agronomic intelligence, soil test NPK stoichiometry, crop suitability recommendations, fertilizer split application timelines, and Bayesian plant disease diagnostics.

---

## 🚀 Key Features

1. **Python Core Agronomic Decision Engine**: Over 70,000 lines of pure Python (`agrimind/`) implementing 10 specialized agricultural analysis modules.
2. **Indian Crop Cultivar Recommendations**: Parameter-based evaluation for major Indian crops (Paddy Rice, Wheat, Bt Cotton, Sugarcane, Chickpea, Mustard, Groundnut, Tomato, Potato, Maize).
3. **Fertilizer & Soil Stoichiometry**: Stage-by-stage split application schedules for Urea (46% N), DAP (18:46:0), MOP (60% K2O), and Zinc Sulfate.
4. **Farmer Authentication & Profile Dashboard**: User signup, login, profile management, and activity history tracking.
5. **No External APIs**: Operates 100% locally and self-contained without third-party network API dependencies.

---

## 🛠️ Architecture & Tech Stack

- **Backend Engine**: Pure Python 3.9+ (`agrimind/core`, `agrimind/modules`, `agrimind/data`, `agrimind/backend`)
- **Database**: SQLite3 (`agrimind/backend/agrimind.db`)
- **Frontend UI**: React 18, TypeScript, Vite, Tailwind CSS
- **Icons & Visuals**: Lucide React Icons

---

## 📋 Installation

### 1. Prerequisites
- Python 3.9 or higher
- Node.js 18.0 or higher
- npm 9.0 or higher

### 2. Clone Repository & Setup Virtual Environment
```bash
git clone https://github.com/rockychandu/AgriMind.git
cd AgriMind

# Create and activate Python virtual environment
python -m venv venv

# On Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# On Linux/macOS
source venv/bin/activate
```

### 3. Install Dependencies
```bash
# Install Python backend dependencies
pip install -r requirements.txt

# Install Frontend dependencies
npm install
```

---

## 🏗️ Build Instructions

To verify TypeScript types and build the production bundle:

```bash
# Build React/Vite web distribution bundle
npm run build
```

The output bundle will be compiled into the `dist/` directory.

---

## 🏃 Run Instructions

### 1. Launch Python REST API Backend (Optional Server Mode)
```bash
python agrimind/run_backend.py
```
*Runs on `http://localhost:8000/`*

### 2. Run Local Python Decision Engine CLI / Direct Mode
```bash
python -m agrimind.main
```

### 3. Launch Frontend Development Server
```bash
npm run dev
```
*Vite local dev server will run on `http://localhost:5175/` (or `http://localhost:5177/`)*

---

## 🧪 Running Tests

Run the complete Python test suite covering all 10 decision engines:

```bash
python -m unittest discover -s agrimind/tests
```

Run Python line counter verification script:

```bash
python agrimind/utils/line_counter.py
```

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
