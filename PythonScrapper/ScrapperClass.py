from ScrappingUtils import *

betclic_data = {
    "name": "Betclic",
    "url": 'https://www.betclic.fr/football-s1/top-football-europeen-p1',
    "matches": {
        "style": 'sports-events-event',
        "index": 'groupEvents_card',
    },
    "teams": {
        "style": 'div',
        "index": 'scoreboard_contestantLabel',
    },
    "date": {
        "style": ['div'],
        "index": ['event_infoTime'],
    },
    "cotes": {
        "style": 'span',
        "index": 'btn_label',
    },
}

winamax_data = {
    "name": "Winamax",
    "url": 'https://www.winamax.fr/paris-sportifs/1',
    "matches": {
        "style": 'div',
        "index": 'sc-jBYKOu kXhrFj',
    },
    "teams": {
        "style": 'div',
        "index": 'sc-hokQRP jnZjny',
    },
    "date": {
        "style": ['div', 'div', 'span'],
        "index": ['sc-bJUkQH eTyeVW', 'sc-flBipw dBfcZz', 'sc-flBipw dBfcZz'],
    },
    "cotes": {
        "style": 'span',
        "index": 'sc-fxLEgV bogQto',
    },
}

class scrapper():
    
    def __init__(self, data):
        self.name = data["name"]
        self.url = data["url"]
        self.matches = data["matches"]
        self.teams = data["teams"]
        self.date = data["date"]
        self.cotes = data["cotes"]
        
    def get_match_teams(self):
        soup = get_soup(self.url)
        matches = soup.find_all(self.matches["style"], self.matches["index"])
        
        Match_Teams = []

        for i,m in enumerate(matches):
            teams = get_teams(m, self.teams["style"], self.teams["index"])
            Match_Teams.append(teams)
            
        return Match_Teams
        
    def get_match_list(self):
        soup = get_soup(self.url)
        matches = soup.find_all(self.matches["style"], self.matches["index"])
        
        Match_List = []

        for i,m in enumerate(matches):
            result = {}
            result["index"] = i
            
            teams = get_teams(m, self.teams["style"], self.teams["index"])
            date = get_date(m, self.date["style"], self.date["index"])
            cotes = get_cotes(m, self.cotes["style"], self.cotes["index"])
                
            if len(cotes)==3:
                result = format_json(date, teams, cotes, result)
                Match_List.append(result)
            
        print(f"[{self.name.upper()}] Data successfuly fetched")
        return Match_List
    
    def save_match_list(self):
        Match_List = self.get_match_list()
        save_data(Match_List)  
        print(f"[{self.name.upper()}] Data saved")  
    
if __name__ == '__main__':
    winamax = scrapper(winamax_data)
    winamax.save_match_list()
    # print(winamax.get_match_list())