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

    table_styles = """
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #ddd;
    """

    td_th_styles = """
    border: 1px solid #ddd;
    padding: 8px;
    """

    tr_styles = """
    background-color: #f2f2f2;
    """

    html_table = f'<table style="{table_styles}">'
    for i, row in enumerate(table_data):
        if i % 2 == 0:  # Add alternative row coloring
            html_table += f'<tr style="{tr_styles}">'
        else:
            html_table += "<tr>"
        for cell in row:
            html_table += f'<td style="{td_th_styles}">{cell}</td>'
        html_table += "</tr>"
    html_table += "</table>"

    return render_template_string(html_table)


if __name__ == "__main__":
    app.run(port=3000, debug=True)
