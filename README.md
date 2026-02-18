# Parabank QA

This is a **test automation project** for Parabank, a demo banking application.  
It is designed for **Quality Assurance (QA) testing** of login functionality, account overview, fund transfers, bill payments, and opening new accounts.  

Tests are implemented using **Cypress**.

---

## 🚀 Local Setup

### 1️⃣ Prerequisites
- **Java 8+** installed (required to run Parabank server)  
- Optional: **Apache Tomcat** if you want to deploy the WAR file, or just run the standalone JAR

### 2️⃣ Download Parabank server
- Get the Parabank **WAR or JAR** from:  
[https://github.com/parasoft/parabank/releases](https://github.com/parasoft/parabank/releases)

#### If using WAR:
1. Place `parabank.war` in the `webapps` folder of Tomcat.  
2. Start Tomcat:
```bash
# Windows
catalina.bat run
# Linux/macOS
catalina.sh run
