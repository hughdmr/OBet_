from itertools import combinations
from SportOddsScrapping import scrapper_netbet, scrapper_betclic, scrapper_winamax
import os
import time
import json

def calculate_combinates(list, nbr):
    # print(list)
    L = []
    if nbr == 2:
        for i in range(3):
            for j in range(3):
                    if (list[0][i]<=1 or list[1][j]<=1):
                        raise ValueError
                    else:
                        L.append(list[0][i]*list[1][j])
    elif nbr == 3:
        for i in range(3):
            for j in range(3):
                for k in range(3):
                    if (list[0][i]<=1 or list[1][j]<=1 or list[2][k]<=1):
                        raise ValueError
                    else:
                        L.append(list[0][i]*list[1][j]*list[2][k])
    elif nbr == 4:
        for i in range(3):
            for j in range(3):
                for k in range(3):
                    for l in range(3):
                        if (list[0][i]<=1 or list[1][j]<=1 or list[2][k]<=1 or list[3][l]<=1):
                            raise ValueError
                        else:
                            L.append(list[0][i]*list[1][j]*list[2][k]*list[3][l])
    return L

def convert_inversed(combinates_list):
    return [1/(i-1) for i in combinates_list]

def gain(L, nbr):
    combinates = calculate_combinates(L, nbr)
    inverted = convert_inversed(combinates)
    value = 100*(inverted[0]/sum(inverted))*(combinates[0]-1)
    return value

def calcul_combinaisons(L, nbr):
    return [i for i in combinations(L,nbr)]

def main(bookmaker, nbr):
    print(f"[CHARGEMENT] Lancement de l'algorithme d'analyse stochastique... ")
    Match_List = []
    
    # Time analysis
    temps = time.time()
    print(temps)
    
    if not os.path.exists('./data'):
        os.mkdir('./data')
        
    liste_temps = [int(i[:-5].split('-')[1]) for i in os.listdir("./data/")]
    bookmaker_list = [str(i[:-5].split('-')[0]) for i in os.listdir("./data/")]
    
    bookmaker_name = ""
    temps_max = 0
    for i in range(len(liste_temps)):
        if liste_temps[i]>temps_max:
            temps_max = liste_temps[i]
            bookmaker_name = bookmaker_list[i]
    print(bookmaker_name)
    
    # Scrapp only if the last scrap last for more than one minute
    if temps-temps_max > 100 or bookmaker_name != bookmaker:
        
        if bookmaker == "betclic":
            Match_List = scrapper_betclic()
        elif bookmaker == "netbet":
            Match_List = scrapper_netbet()
        elif bookmaker == "winamax":
            Match_List = scrapper_winamax()
        else:
            raise ValueError("Le bookmaker indiqué n'est pas configuré")
                
        if os.path.exists(f"./data/{bookmaker}-{temps_max}.json"):
            os.remove(f"./data/{bookmaker}-{temps_max}.json")
    else:
        with open(f"./data/{bookmaker}-{temps_max}.json", "r") as f:
            Match_List = json.load(f)
    
    # All possible match combinations
    combinaisons = calcul_combinaisons(Match_List, nbr)
    
    # Liste des gains
    G = []
    
    # On chosit un échantillon de 3 matchs
    for i in combinaisons:
        gain_match = gain([j["cotes"] for j in i], nbr)
        G.append(gain_match)
        
    # UI
    print("\nAFFICHAGE DES RESULTATS \n")
    
    # Le meilleur taux de conversion
    taux_conversion = f"Le meilleur taux de conversion actuel est {max(G):.2f}% \n"
    print(taux_conversion)
    
    # Récupération des matchs associés
    max_index = G.index(max(G))
    Solution = combinaisons[max_index]
    if nbr == 2:
        matchs_jouer = f"Les matchs à jouer sont: \n\n\
            {Solution[0]["equipes"][0]}/{Solution[0]["equipes"][1]} {Solution[0]["date"]} \n\
            {Solution[1]["equipes"][0]}/{Solution[1]["equipes"][1]} {Solution[1]["date"]}"
    elif nbr == 3:
        matchs_jouer = f"Les matchs à jouer sont: \n\n\
            {Solution[0]["equipes"][0]}/{Solution[0]["equipes"][1]} {Solution[0]["date"]} \n\
            {Solution[1]["equipes"][0]}/{Solution[1]["equipes"][1]} {Solution[1]["date"]} \n\
            {Solution[2]["equipes"][0]}/{Solution[2]["equipes"][1]} {Solution[2]["date"]}"
    elif nbr == 4:
        matchs_jouer = f"Les matchs à jouer sont: \n\n\
            {Solution[0]["equipes"][0]}/{Solution[0]["equipes"][1]} {Solution[0]["date"]} \n\
            {Solution[1]["equipes"][0]}/{Solution[1]["equipes"][1]} {Solution[1]["date"]} \n\
            {Solution[2]["equipes"][0]}/{Solution[2]["equipes"][1]} {Solution[2]["date"]} \n\
            {Solution[3]["equipes"][0]}/{Solution[3]["equipes"][1]} {Solution[3]["date"]}"
    
    print(matchs_jouer)
    
    # Renvoi fonction
    return taux_conversion + matchs_jouer