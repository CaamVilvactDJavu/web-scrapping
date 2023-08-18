from flask import Flask, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from flask_cors import CORS
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

app = Flask(__name__)
CORS(app)


@app.route('/sensors2', methods=['GET', 'POST'])
def sensors():
    url = "https://simora.bmkg.go.id/simora/simora_upt/status_acc2"
    login_url = "https://simora.bmkg.go.id/simora/web/login_page"

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")

    all_table_data = []

    with webdriver.Chrome(options=chrome_options) as driver:
        # Visit login page and perform login
        driver.get(login_url)

        # Assuming the username field has an id 'username' and password field has an id 'password'
        # and the login button has an id 'loginBtn'. Adjust these selectors as per actual elements on the webpage.
        username_field = driver.find_element(
            By.XPATH, "/html/body/div/div/div/div/div[1]/div/form/div[1]/div/input")
        password_field = driver.find_element(
            By.XPATH, "/html/body/div/div/div/div/div[1]/div/form/div[2]/div/input")
        login_button = driver.find_element(
            By.XPATH, "/html/body/div/div/div/div/div[1]/div/form/div[3]/input")

        # Set your actual username and password here
        username_field.send_keys("")
        password_field.send_keys("")
        login_button.click()

        # Wait for some time to ensure login is complete
        WebDriverWait(driver, 10).until(EC.url_changes(login_url))

        # Once logged in, visit the desired page
        driver.get(url)

        WebDriverWait(driver, 60).until_not(
            EC.text_to_be_present_in_element(
                (By.XPATH, "//table[@id='example']//td[contains(text(), 'Loading...')]"), "Loading...")
        )

        try:
            table_element = driver.find_element(By.XPATH, "//*[@id='example']")
        except Exception as e:
            print("Error finding table:", e)
            return jsonify({"error": "Table not found"}), 404

        table_html = table_element.get_attribute('outerHTML')
        soup = BeautifulSoup(table_html, 'html.parser')
        table = soup.find("table")

        headers = [header.text for header in table.find(
            "thead").find_all("th")]
        tbody = table.find("tbody")

        rows = tbody.find_all("tr")
        for row in rows:
            columns = row.find_all("td")
            row_data = {}
            for header, column in zip(headers, columns):
                row_data[header] = column.text.strip()
            all_table_data.append(row_data)

    return jsonify(all_table_data)


if __name__ == "__main__":
    app.run(port=3000, debug=True)
