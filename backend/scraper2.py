from flask import Flask, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from flask_cors import CORS
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

app = Flask(__name__)
CORS(app)


@app.route('/sensors2', methods=['GET'])
def sensors():
    login_url = "https://simora.bmkg.go.id/simora/web/login_page"

    username = 'stageof.padangpanjang'
    password = '12345678'

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")

    with webdriver.Chrome(options=chrome_options) as driver:
        driver.get(login_url)

        try:
            # Use explicit waits
            wait = WebDriverWait(driver, 15)

            # Login process
            username_input = wait.until(
                EC.presence_of_element_located((By.ID, 'exampleInputEmail')))
            password_input = wait.until(
                EC.presence_of_element_located((By.ID, 'exampleInputPassword')))
            login_button = wait.until(EC.presence_of_element_located(
                (By.XPATH, '//input[@name="login"]')))

            username_input.send_keys(username)
            password_input.send_keys(password)
            login_button.click()

            print("Logged in successfully!")
            print("URL after login:", driver.current_url)

            # Click on the sidebar item after logging in
            print("Waiting for sidebar element...")
            sidebar_element = wait.until(EC.element_to_be_clickable(
                (By.XPATH, '//*[@id="sidebar"]/ul/li[2]/a')))
            sidebar_element.click()
            print("Clicked on the sidebar anchor")

            return jsonify({"message": "Logged in and clicked the sidebar successfully!"})

        except Exception as e:
            print("Error:", e)
            return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(port=3001, debug=True)
