from flask import Flask, render_template_string
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS

app = Flask(__name__, static_folder='public', static_url_path='')
CORS(app)  # This will allow all origins to access your Flask API


@app.route('/sensors')
def sensors():
    url = "http://202.90.198.40/sismon-wrs/web/detail_slmon2/AAFM"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    rows = soup.select('table tr')
    table_data = [[cell.get_text(strip=True)
                   for cell in row.select('td')] for row in rows]

    html_table = '<table>'
    for row in table_data:
        html_table += "<tr>"
        for cell in row:
            html_table += f"<td>{cell}</td>"
        html_table += "</tr>"
    html_table += "</table>"

    return render_template_string(html_table)


if __name__ == "__main__":
    app.run(port=3000, debug=True)
