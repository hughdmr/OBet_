from selenium import webdriver
from selenium.webdriver.chrome.options import Options

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
    
def save_data(matches, bookmaker):
    if not os.path.exists('./data'):
        os.mkdir('./data')
    with open(f"./data/{bookmaker}-{time.time():.0f}.json", "w") as f:
        json.dump(matches, f, ensure_ascii=False, indent=4)
        
def get_soup(url):
    chrome_options = Options()
    chrome_options.add_argument("--headless") 
    driver = webdriver.Chrome(options=chrome_options)
    # chrome_options.add_argument('--disable-dev-shm-usage') 
    # hub_url = "http://selenium:4444"
    # driver = webdriver.Remote(command_executor=hub_url, options=chrome_options)
    
    driver.get(url)
    print(f"[{url.split('.')[1].upper()}] Driver is connected...")
    
    #Scroll automatique vers le bas
    scroll(500, driver)
    
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    driver.quit()
    return soup

def get_data(instance, max_delta=100):
    
    # Time analysis
    temps = time.time()
    
    # If never scrapped, the fetch data
    if not os.path.exists('./data'):
        os.mkdir('./data')
        
    def get_name(str_json):
        return str(str_json.split('.')[0].split('-')[0])

    def get_time(str_json):
        return int(str_json.split('.')[0].split('-')[1])
        
    liste_temps = [get_time(i) for i in os.listdir("./data/") if get_name(i) == instance.name]
    
    if len(liste_temps) > 0:
        temps_max = max(liste_temps)
    else:
        temps_max = 0
    
    # If the last scrap last for more than one minute, scrap again
    if temps-temps_max > max_delta:
        print(f"[{instance.name.upper()}] Saved data is too old, fetch data again")
        Match_List = instance.save_match_list()
        if os.path.exists(f"./data/{instance.name}-{temps_max}.json"):
            os.remove(f"./data/{instance.name}-{temps_max}.json")
    # Else, only load the Json file
    else:
        with open(f"./data/{instance.name}-{temps_max}.json", "r") as f:
            Match_List = json.load(f)
            print(f"[{instance.name.upper()}] Saved data is recent, get saved data")
    return Match_List