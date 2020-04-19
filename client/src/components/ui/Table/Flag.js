import * as React from 'react';
import FlagIconFactory from 'react-flag-icon-css';
 
const CC = ["af","ax","al","dz","as","ad","ao","ai","aq","ag","ar","am","aw","au","at","az","bs","bh","bd","bb","by","be","bz","bj","bm","bt","bo","bq","ba","bw","bv","br","io","bn","bg","bf","bi","kh","cm","ca","cv","es-ct","ky","cf","td","cl","cn","cx","cc","co","km","cg","cd","ck","cr","ci","hr","cu","cw","cy","cz","dk","dj","dm","do","ec","eg","sv","gq","er","ee","et","eu","fk","fo","fj","fi","fr","gf","pf","tf","ga","gm","ge","de","gh","gi","gr","gl","gd","gp","gu","gt","gg","gn","gw","gy","ht","hm","va","hn","hk","hu","is","in","id","ir","iq","ie","im","il","it","jm","jp","je","jo","kz","ke","ki","kp","kr","kw","kg","la","lv","lb","ls","lr","ly","li","lt","lu","mo","mk","mg","mw","my","mv","ml","mt","mh","mq","mr","mu","yt","mx","fm","md","mc","mn","me","ms","ma","mz","mm","na","nr","np","nl","nc","nz","ni","ne","ng","nu","nf","mp","no","om","pk","pw","ps","pa","pg","py","pe","ph","pn","pl","pt","pr","qa","re","ro","ru","rw","bl","sh","kn","lc","mf","pm","vc","ws","sm","st","sa","sn","rs","sc","sl","sg","sx","sk","si","sb","so","za","gs","ss","es","lk","sd","sr","sj","sz","se","ch","sy","tw","tj","tz","th","tl","tg","tk","to","tt","tn","tr","tm","tc","tv","ug","ua","ae","gb","gb-eng","gb-nir","gb-sct","gb-wls","un","us","um","uy","uz","vu","ve","vn","vg","vi","wf","eh","ye","zm","zw"]

const CountryISOCode = {
    "USA": "us",
    "UK": "gb",
    "Iran": "ir",
    "Russia": "ru",
    "Taiwan": "tw",
    "S. Korea": "kr",
    "UAE": "ae",
    "Moldova": "md",
}

const FlagIcon = FlagIconFactory(React, { useCssModules: false });

export {CountryISOCode, CC, FlagIcon};