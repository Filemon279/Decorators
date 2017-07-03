Main -> formatOne | range _ (float|int|formatOne) _:? range _ formatOne | noCurrency | formatTwo | scalars | currency | time


float ->
    	int ("."|",") int   	{% function(d) {return {token:"number",value:parseFloat(d[0].value + "." + d[2].value)}} %} |
    	int _ int ("."|",") int   {% function(d) {return {token:"number",value:parseFloat(d[0].value + d[2].value + "." +d[4].value )}} %} 		

int -> [0-9]:+        {% function(d) {return {token:"number",value:d[0].join("")}} %}



range -> ("od" | "do"|"min"|"max" |"min." | "max." |"nie mniej niż" | "nie więcej niż") {% function(d) {return {token:"range", value:d[0][0]}}%}

scalars -> ("jeden"|"jedna"|"jedno"|"tysiąc"|"tysiące"|"tysięcy"|"tys" | "k" |"tyś"|"milion"|"miliony"|"milionów"|"mln"|"M"|
"miliard"|"miliardy"|"miliardów"|"mld"|"bilion"|"biliony"|"bilionów"|"bn"|"procent"|"%"|"promil"|"‰"|"nieskończoność"|
"bez ograniczeń"|"∞"|"x"|"bez wartości"|"-"|"n/a"|"b.d."|"brak"|"brak danych"|"bd"|"brak informacji")
{% function(d) {return {token:"scalar", value:d[0][0]}}%}

time -> ("dzień" | "dni" | "d" | "D"|"tydzień" | "tygodnie" | "tygodni" | "tydz"|"miesiąc" | "miesiące" | "miesięcy" | "m-c" | "M" | "mc"|
"kwartał" | "kwartały" | "kwartałów" | "kw" | "Q"|"rok" | "lata" | "lat" | "r" | "R" | "Y") 
{% function(d) {return {token:"time", value:d[0][0]}}%}

currency -> ("AUD" | "dolar australijski" | "dolary australijskie" | "dolarów australijskich" "EUR" | "euro" | "€"|
"CAD" | "dolar kanadyjski" | "dolary kanadyjskie" | "dolarów kanadyjskich" | "CNY" | "juan" | "juany" | "juanów"| "HRK" | "kuna" | "kuny"|
"CZK" | "korona czeska" | "korony czeskie" | "koron czeskich"| "DKK" | "korona duńska" | "korony duńskie" | "koron duńskich"|
"EUR" | "euro" | "€"| "HUF" | "forint" | "forinty" | "forintów"|"EUR" | "euro" | "€"| "JPY" | "jen" | "jeny" | "jenów"|
"NOK" | "korona norweska" | "korony norweskie" | "koron norweskich"|"PLN" | "złoty" | "złote" | "złotych" | "zł" |"Zł"|
"EUR" | "euro" | "€"|"RON" | "lej" | "leje" | "lei"|"RUB" | "rubel" | "ruble" | "rubli"|"SEK" | 
"korona szwedzka" | "korony szwedzkie" | "koron szwedzkich"|"CHF" | "frank" | "franki" | "franków"|"UAH" | "hrywna" | "hrywny" | "hrywien"|
"GBP" | "funt" | "funty" | "funtów" | "£"|"USD" | "dolar" | "dolary" | "dolarów" | "$" ) {% function(d) {return {token:"currency", value:d[0][0]}} %}

string -> ("kwota" | "value" | "cena" | "wartość" | "gotówka" ){% function(d) {return {token:"string", value:d[0][0]}}%}

_ -> [\s]:*    {%function(d) { return null }%}

formatOne -> _:? string:? _:? (float|int) _:? scalars:? _:? (currency|(currency _:? scalars _:?))
formatTwo -> _:? string:? _:? (scalars|time|currency) _:? (currency|float|int) _:? (float|int|scalars|time) _:?
formatThree -> _:? string:? _:? (scalars|time) _:? (currency|currency _:? (float|int) _:?)
noCurrency -> _:? string:? _:? (float|int) _:? (scalars|time) _:? | (scalars|time) _:? (float|int) _:?
