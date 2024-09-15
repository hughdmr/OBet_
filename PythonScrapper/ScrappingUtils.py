import chromedriver_autoinstaller
from selenium import webdriver
from bs4 import BeautifulSoup
import os
import json
import time

def isfloat(a):
    try:
        x = float(a)
    except ValueError:
        return False
    return True

def purifier(cotes):
    new_cotes = []
    for i in cotes:
        if isfloat(i.replace(",",".")):
            new_cotes.append(float(i.replace(",",".")))
    return new_cotes

def scroll(value, driver):
    for i in range(20): #nombre de micro-scroll à effectuer
        driver.execute_script("window.scrollBy(0, {})".format(value))
        time.sleep(0.1)
        
def get_teams(m, html_type, html_index):
    teams = [i.text.replace("\n", "").strip() for i in m.find_all(html_type, html_index)]
    if 'Match nul' in teams:
        teams.remove('Match nul')
    return teams

def get_cotes(m, html_type, html_index):
    return purifier([i.text for i in m.find_all(html_type, html_index)])

def get_date(m, html_type_list, html_index_list):
    if len(html_index_list) != len(html_type_list):
        raise ValueError("Les listes doivent avoir la même longueur")
    for i in range(len(html_type_list)):
        if m.find(html_type_list[i], html_index_list[i]) != None:
            return m.find(html_type_list[i], html_index_list[i]).text.replace("\n", "").strip()
        
def format_json(date, teams, cotes, result):
    result["date"] = f"{date}"
    result["equipes"] = [f"{teams[0]}", f"{teams[1]}"]
    result["cotes"] = [cotes[0], cotes[1], cotes[2]]
    return result
    
def save_data(matches):
    if not os.path.exists('./data'):
        os.mkdir('./data')
    with open(f"./data/winamax-{time.time():.0f}.json", "w") as f:
        json.dump(matches, f, ensure_ascii=False, indent=4)
        
def get_soup(url):
    #chromedriver_autoinstaller.install()
    driver = webdriver.Chrome()
    driver.get(url)
    print(f"[{url.split('.')[1].upper()}] Driver is connected...")
    
    #Scroll automatique vers le bas
    scroll(500, driver)
    
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    return soup