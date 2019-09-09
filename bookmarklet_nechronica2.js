void((function(undefined) {
    try {
        if (location.hostname !== "charasheet.vampire-blood.net") {
            window.alert("このサイトでは使えません");
            return;
        }
        let url;
        let bloburl;
        let a;

        GEBN = document.getElementsByName.bind(document);
        let maneuverElements;
        let maneuverLists = [];
        let maneuverPosition = "";
        let maneuverTiming = "";
        let character_name = "";
        let position = "";
        let main_class = "";
        let sub_class = "";
        let strengthening_value = [];
        let act_value_total;
        let act_value_max = 9;
        let suggestion = "";
        let age = "";
        let layout = "";
        let favor_point;
        let carma = ["","",""];
        let memory_list = [["",""],["",""],["",""],["",""],["",""],["",""]];
        let attachment_list = [["","",3],["","",3],["","",3],["","",3],["","",3],["","",3]];
        let memo = "";
        let s = [];
        let patternString = /"|'|<|>|&/g;

        function escapeString() {
            if(arguments[0] === "\"") {
                return "&quot;";
            } else if(arguments[0] === "\'") {
                return "&apos;";
            } else if(arguments[0] === "<") {
                return "&lt;";
            } else if(arguments[0] === ">") {
                return "&gt;";
            } else if(arguments[0] === "&") {
                return "&amp;";
            }
        }
            
        function makeNormalElement(eName,eAttribute,eText) {
            let elem = document.createElement("data");
            elem.setAttribute(eName,eAttribute);
            elem.textContent = eText;
            return elem;
        }

        function makeResourceElement(rName,rAttribute,rText,rCurrent) {
            let elem = document.createElement("data");
            elem.setAttribute("type","numberResource");
            elem.setAttribute("currentValue",rCurrent);
            elem.setAttribute(rName,rAttribute);
            elem.textContent = rText;
            return elem;
        }

        function makeNoteElement(nName,nAttribute,nText) {
            let elem = document.createElement("data");
            elem.setAttribute("type","note");
            elem.setAttribute(nName,nAttribute);
            elem.textContent = nText;
            return elem;
        }
        
        function makeParentElement(attribute) {
            let elem = document.createElement("data");
            elem.setAttribute("name",attribute);
            return elem;
        }

        // いったん取得してエスケープ処理をします
        if (GEBN("pc_name")[0].value !== undefined) {
            character_name = GEBN("pc_name")[0].value.replace(patternString, escapeString);
        }
        if (GEBN("Position_Name")[0].value !== undefined) {
            position = GEBN("Position_Name")[0].value.replace(patternString, escapeString);
        }
        if (GEBN("MCLS_Name")[0].value !== undefined) {
            main_class = GEBN("MCLS_Name")[0].value.replace(patternString, escapeString);
        }
        if (GEBN("SCLS_Name")[0].value !== undefined) {
            sub_class = GEBN("SCLS_Name")[0].value.replace(patternString, escapeString);
        }
        strengthening_value.push(GEBN("NP1")[0].value, GEBN("NP2")[0].value, GEBN("NP3")[0].value);
        act_value_total = GEBN("Act_Total")[0].value;
        if (!Number.isNaN(parseInt(GEBN("Act_PartsA_Ef")[0].value))) {
            act_value_max += parseInt(GEBN("Act_PartsA_Ef")[0].value);
        }
        if (!Number.isNaN(parseInt(GEBN("Act_PartsB_Ef")[0].value))) {
            act_value_max += parseInt(GEBN("Act_PartsB_Ef")[0].value);
        }
        if (!Number.isNaN(parseInt(GEBN("Act_PartsC_Ef")[0].value))) {
            act_value_max += parseInt(GEBN("Act_PartsC_Ef")[0].value);
        }
        if (GEBN("pc_carma")[0].value !== undefined) {
            suggestion = GEBN("pc_carma")[0].value.replace(patternString, escapeString);
        }
        if (GEBN("age")[0].value !== undefined) {
            age = GEBN("age")[0].value;
        }
        if (GEBN("sex")[0].value !== undefined) {
            layout = GEBN("sex")[0].value.replace(patternString, escapeString);
        }
        if (GEBN("exp_his_sum")[0].value !== undefined) {
            favor_point = GEBN("exp_his_sum")[0].value;
        }
        for (let index_carma = 0; index_carma < carma.length; index_carma++) {
            if (GEBN("carma_name[]")[index_carma].value !== undefined) {
                carma[index_carma] = GEBN("carma_name[]")[index_carma].value.replace(patternString, escapeString);
            }
        }
        for (let index_memory = 0; index_memory < GEBN("kakera_name[]").length; index_memory++) {
            if (GEBN("kakera_name[]")[index_memory].value !== undefined) {
                memory_list[index_memory][0] = GEBN("kakera_name[]")[index_memory].value.replace(patternString, escapeString);
            }
            if (GEBN("kakera_memo[]")[index_memory].value !== undefined) {
                memory_list[index_memory][1] = GEBN("kakera_memo[]")[index_memory].value.replace(patternString, escapeString);
            }
        }
        for (let index_attachment = 0; index_attachment < attachment_list.length; index_attachment++) {
            if (GEBN("roice_name[]")[index_attachment].value !== undefined) {
                attachment_list[index_attachment][1] = GEBN("roice_name[]")[index_attachment].value.replace(patternString, escapeString);
            }
            if (GEBN("roice_pos[]")[index_attachment].value !== undefined) {
                attachment_list[index_attachment][0] = GEBN("roice_pos[]")[index_attachment].value.replace(patternString, escapeString);
            }
            if (GEBN("roice_damage[]")[index_attachment].value !== undefined) {
                attachment_list[index_attachment][2] = GEBN("roice_damage[]")[index_attachment].value;
            }
        }
        if (GEBN("pc_making_memo")[0].innerHTML !== undefined) {
            memo = GEBN("pc_making_memo")[0].innerHTML.replace(patternString, escapeString);
        }
            
        maneuverElements = document.getElementById("Table_Power").getElementsByTagName("tr");
        for (let index = 1; index < maneuverElements.length/*ここには<tbody>内の<tr>の数が入る*/; index++) {
            switch (parseInt(maneuverElements[index].children[3].children[1].value)) {
                case 0:
                    maneuverPosition = "";
                    break;
                case 1:
                    maneuverPosition = "ポジション";
                    break;
                case 2:
                    maneuverPosition = "メインクラス";
                    break;
                case 3:
                    maneuverPosition = "サブクラス";
                    break;
                case 4:
                    maneuverPosition = "頭";
                    break;
                case 5:
                    maneuverPosition = "腕";
                    break;
                case 6:
                    maneuverPosition = "胴";
                    break;
                case 7:
                    maneuverPosition = "脚";
                    break;
                default:
                    break;
            }
            switch (parseInt(maneuverElements[index].children[5].children[1].value)) {
                case 0:
                    if (maneuverPosition === "") {
                        maneuverTiming = "";
                    }
                    else
                    {
                        maneuverTiming = "オート";
                    }
                    break;
                case 1:
                    maneuverTiming = "アクション";
                    break;
                case 2:
                    maneuverTiming = "ジャッジ";
                    break;
                case 3:
                    maneuverTiming = "ダメージ";
                    break;
                case 4:
                    maneuverTiming = "ラピッド";
                    break;
            
                default:
                    break;
            }
            maneuverLists.push(/* [0]マニューバ名 */[maneuverElements[index].children[4].children[0].value.replace(patternString, escapeString), /* [1]部位 */maneuverPosition, /* [2]説明文 */maneuverTiming+"/"+maneuverElements[index].children[6].children[0].value.replace(patternString, escapeString)+"/"+maneuverElements[index].children[7].children[0].value.replace(patternString, escapeString)+"/"+maneuverElements[index].children[8].children[0].value.replace(patternString, escapeString)]);
        }
            
        // xmlを生成します
        let madexml = document.createElement("character");
        madexml.setAttribute("location.name","table");
        madexml.setAttribute("location.x","1");
        madexml.setAttribute("location.y","1");
        madexml.setAttribute("posZ","0");
        madexml.setAttribute("rotate","0");
        madexml.setAttribute("roll","0");

        // dataの一番外(character)
        let character = document.createElement("data");
        character.setAttribute("name","character");

        // dataの2番目の1(image)
        let img = document.createElement("data");
        img.setAttribute("name","image");
        let imgChild = document.createElement("data");
        imgChild.setAttribute("type","image");
        imgChild.setAttribute("name","imageIdentifier");
        imgChild.textContent = "";
        img.appendChild(imgChild);
        character.appendChild(img);

        // dataの2番目の2(common)
        let common = document.createElement("data");
        common.setAttribute("name","common");
        let commonChild;
        commonChild = makeNormalElement("name","name",character_name);
        common.appendChild(commonChild);
        commonChild = makeNormalElement("name","size","1");
        common.appendChild(commonChild);
        character.appendChild(common);

        // dataの2番目の3(detail)
        let detail;
        detail = makeParentElement("detail");

        // ステータス
        let detailChildSt;
        detailChildSt = makeParentElement("ステータス");
        let detailChildStChildP;
        detailChildStChildP = makeNormalElement("name","ポジション",position);
        detailChildSt.appendChild(detailChildStChildP);
        let detailChildStChildMC;
        detailChildStChildMC = makeNormalElement("name","メインクラス",main_class);
        detailChildSt.appendChild(detailChildStChildMC);
        let detailChildStChildSC;
        detailChildStChildSC = makeNormalElement("name","サブクラス",sub_class);
        detailChildSt.appendChild(detailChildStChildSC);
        let detailChildStChildSV;
        detailChildStChildSV = makeNormalElement("name","強化値",strengthening_value[0]+"/"+strengthening_value[1]+"/"+strengthening_value[2]);
        detailChildSt.appendChild(detailChildStChildSV);
        let detailChildStChildAV;
        detailChildStChildAV = makeResourceElement("name","最大行動値",act_value_max,act_value_total);
        detailChildSt.appendChild(detailChildStChildAV);
        let detailChildStChildSu;
        detailChildStChildSu = makeNormalElement("name","暗示",suggestion);
        detailChildSt.appendChild(detailChildStChildSu);
        let detailChildStChildAg;
        detailChildStChildAg = makeNormalElement("name","享年",age);
        detailChildSt.appendChild(detailChildStChildAg);
        let detailChildStChildLa;
        detailChildStChildLa = makeNormalElement("name","初期配置",layout);
        detailChildSt.appendChild(detailChildStChildLa);
        let detailChildStChildFP;
        detailChildStChildFP = makeNormalElement("name","寵愛点",favor_point);
        detailChildSt.appendChild(detailChildStChildFP);
        detail.appendChild(detailChildSt);

        // カルマ
        let detailChildCarma;
        detailChildCarma = makeParentElement("カルマ");
        let detailChildCarmaChild;
        for(let carma_lp = 0; carma_lp < carma.length; carma_lp++){
            detailChildCarmaChild = makeNormalElement("name","タグ",carma[carma_lp]);
            detailChildCarma.appendChild(detailChildCarmaChild);
        }
        detail.appendChild(detailChildCarma);

        // 記憶のカケラ
        let detailChildMemory;
        detailChildMemory = makeParentElement("記憶のカケラ");
        let detailChildMemoryChild;
        for(let memory_lp = 0; memory_lp < memory_list.length; memory_lp++){
            detailChildMemoryChild = makeNormalElement("name",memory_list[memory_lp][0],memory_list[memory_lp][1]);
            detailChildMemory.appendChild(detailChildMemoryChild);
        }
        detail.appendChild(detailChildMemory);

        // 未練
        let detailChildAt;
        detailChildAt = makeParentElement("未練");
        let detailChildAtChildName;
        let detailChildAtChildNameChild;
        for(let at_lp = 0; at_lp < attachment_list.length; at_lp++){
            detailChildAtChildName = makeParentElement(attachment_list[at_lp][0]);
            detailChildAtChildNameChild = makeResourceElement("name",attachment_list[at_lp][1],"4",attachment_list[at_lp][2]);
            detailChildAtChildName.appendChild(detailChildAtChildNameChild);
            detailChildAt.appendChild(detailChildAtChildName);
        }
        detail.appendChild(detailChildAt);

        // マニューバ
        let detailChildMn;
        detailChildMn = makeParentElement("マニューバ");
        let detailChildMnChildName;
        let detailChildMnChildNameChild;
        for(let mn_lp = 0; mn_lp < maneuverLists.length; mn_lp++){
            detailChildMnChildName = makeParentElement(maneuverLists[mn_lp][0]);
            detailChildMnChildNameChild = makeNormalElement("name",maneuverLists[mn_lp][1],maneuverLists[mn_lp][2]);
            detailChildMnChildName.appendChild(detailChildMnChildNameChild);
            detailChildMn.appendChild(detailChildMnChildName);
        }
        detail.appendChild(detailChildMn);

        // その他メモ
        let detailChildMemo;
        detailChildMemo = makeParentElement("その他メモ");
        let detailChildMemoChild;
        detailChildMemoChild = makeNoteElement("name","タグ",memo);
        detailChildMemo.appendChild(detailChildMemoChild);
        detail.appendChild(detailChildMemo);

        character.appendChild(detail);
        madexml.appendChild(character);

        // チャットパレット
        let chatPalette = document.createElement("chat-palette");
        chatPalette.setAttribute("dicebot","Nechronica");
        chatPalette.textContent = "1NC\n1NA\n";
        for(let chat_lp = 0;chat_lp < maneuverLists.length;chat_lp++){
            chatPalette.textContent += "\n" + maneuverLists[chat_lp][0] + "/" + maneuverLists[chat_lp][1] + "/" + maneuverLists[chat_lp][2];
        }
        madexml.appendChild(chatPalette);

        // xmlを作る
        oSerializer = new XMLSerializer();
        sXML = oSerializer.serializeToString(madexml);
        sXML = sXML.replace(/xmlns="http:\/\/www.w3.org\/1999\/xhtml"/g,'');
        sXML = sXML.replace(/currentvalue/g,'currentValue');

        // xmlをダウンロードさせる
        blob  = new Blob([sXML]);
        url = window.URL;
        bloburl = url.createObjectURL(blob);

        a = document.createElement("a");
        a.download = 'data.xml';
        a.href = bloburl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    catch(e) {
        window.alert("失敗しました");
    }
  })());