from bs4 import BeautifulSoup
from urllib.request import urlopen
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


class BS4:
    def __init__(self, url):
        self.url = url
        res = urlopen(self.url)
        html = res.read()
        self.soup = BeautifulSoup(html, "html.parser")

    def select(self, css_selector):
        return self.soup.select(css_selector)


class Selenium:
    def __init__(self, url):
        self.url = url
        chrome_options = Options()
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)
        self.driver.get(self.url)
    
    def close_driver(self):
        self.driver.quit()
    
        