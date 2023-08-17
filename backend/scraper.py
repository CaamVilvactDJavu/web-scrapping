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


@app.route('/sensors', methods=['GET', 'POST'])
def sensors():
    url = "http://202.90.198.40/sismon-wrs/web/slmon2/"

    # Setup Selenium Chrome options
    chrome_options = Options()
    # Run Chrome in headless mode (no GUI)
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")

    with webdriver.Chrome(options=chrome_options) as driver:
        driver.get(url)

        WebDriverWait(driver, 10).until_not(
            EC.text_to_be_present_in_element(
                (By.XPATH, "//table[@id='test']//td[contains(text(), 'Loading...')]"), "Loading...")
        )

        # Extract page content
        page_content = driver.page_source

    soup = BeautifulSoup(page_content, 'html.parser')

    # Extract the table
    table = soup.find("table", {"id": "test"})
    if not table:
        return jsonify({"error": "Table not found"}), 404

    # Extract table headers
    headers = [header.text for header in table.find("thead").find_all("th")]

    # Extract rows
    tbody = table.find("tbody")
    if not tbody:
        return jsonify({"error": "Table body not found"}), 404

    rows = tbody.find_all("tr")
    table_data = []

    for row in rows:
        columns = row.find_all("td")
        row_data = {}
        for header, column in zip(headers, columns):
            row_data[header] = column.text.strip()
        table_data.append(row_data)

    return jsonify(table_data)


if __name__ == "__main__":
    app.run(port=3000, debug=True)
