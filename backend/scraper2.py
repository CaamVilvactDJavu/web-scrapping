from flask import Flask, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from flask_cors import CORS
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import os

app = Flask(__name__)
CORS(app)


@app.route('/sensors2', methods=['GET'])
def sensors():
    login_url = "https://simora.bmkg.go.id/simora/web/login_page"
    target_url = "https://simora.bmkg.go.id/simora/simora_upt/status_acc2"
    username = 'stageof.padangpanjang'
    password = '12345678'

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=chrome_options)
    driver.get(login_url)

    try:
        # Use explicit waits
        wait = WebDriverWait(driver, 15)

        # Login process
        print("Trying to locate username input")
        username_input = wait.until(
            EC.presence_of_element_located((By.ID, 'exampleInputEmail')))

        print("Trying to locate password input")
        password_input = wait.until(
            EC.presence_of_element_located((By.ID, 'exampleInputPassword')))

        print("Trying to locate login button")
        login_button = wait.until(EC.presence_of_element_located(
            (By.XPATH, '//input[@name="login"]')))

        print("Sending credentials")
        username_input.send_keys(username)
        password_input.send_keys(password)
        login_button.click()

        # Navigate to the target URL
        print("Navigating to target URL")
        driver.get(target_url)

        # Get headers using EC
        print("Fetching headers")
        header_elements = wait.until(EC.presence_of_all_elements_located(
            (By.XPATH, '//*[@id="example"]//thead/tr/th')))
        headers = [header.text for header in header_elements]

        # Get rows using EC
        print("Fetching rows")
        rows = wait.until(EC.presence_of_all_elements_located(
            (By.XPATH, '//*[@id="example"]//tbody/tr')))

        table_data = []
        for index, row in enumerate(rows):
            print(f"Fetching data for row {index + 1}")
            cell_locator = (
                By.XPATH, f'//*[@id="example"]//tbody/tr[{index + 1}]/td')
            cells = wait.until(
                EC.presence_of_all_elements_located(cell_locator))
            row_data = {headers[i]: cell.text for i, cell in enumerate(cells)}
            table_data.append(row_data)

        print("Data fetched successfully")
        return jsonify({"message": "Logged in and extracted data successfully!", "data": table_data})

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

    finally:
        driver.quit()


if __name__ == "__main__":
    app.run(port=3001, debug=True)
