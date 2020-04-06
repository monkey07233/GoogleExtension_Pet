//create new pet
chrome.runtime.onMessage.addListener(function (request) {
    chrome.storage.local.get(["Petname"], function (result) {
        let petType = request.petName;
        let nameobj = result.Petname == undefined ? undefined : JSON.parse(result.Petname);
        console.log(nameobj);
        switch (petType) {
            case "Pisuke":
                var name =
                    nameobj == undefined || nameobj.Pisuke == ""
                        ? "Pisuke"
                        : nameobj.Pisuke;
                petArray.push(new Pet("1-1", 6, 10, name, petType, nameobj));
                break;
            case "Bear":
                var name =
                    nameobj == undefined || nameobj.Bear == "" ? "Bear" : nameobj.Bear;
                petArray.push(new Pet("2-1", 3, 10, name, petType, nameobj));
                break;
            case "Dragon":
                var name =
                    nameobj == undefined || nameobj.Dragon == "" ? "Dragon" : nameobj.Dragon;
                petArray.push(new Pet("3-1", 13, 15, name, petType, nameobj));
                break;
            case "Elizabeth":
                var name =
                    nameobj == undefined || nameobj.Elizabeth == ""
                        ? "Elizabeth"
                        : nameobj.Elizabeth;
                petArray.push(new Pet("4-1", 3, 10, name, petType, nameobj));
                break;
            case "pet5":
                var name =
                    nameobj == undefined || nameobj.pet5 == "" ? "5" : nameobj.pet5;
                petArray.push(new Pet("5-1", 3, 10, name, petType, nameobj));
                break;
            case "PinkBear":
                var name =
                    nameobj == undefined || nameobj.PinkBear == "" ? "PinkBear" : nameobj.PinkBear;
                petArray.push(new Pet("6-1", 3, 20, name, petType, nameobj));
                break;
        }
    });
});

var petArray = [];

function Pet(index, picNum, speed, Petname, petType, petNameObj) {
    //object properties
    this.picIndex = index;
    this.picSpeed = speed;
    this.hp = 100;
    this.attack = 5;
    this.friendlinessDegree = 0;
    this.petDiv = document.createElement("div");
    this.petDiv.id = "imgNo" + petArray.length;
    this.nameDiv = document.createElement("div");
    this.nameDiv.style = "text-align:center;";
    this.nameDiv.id = "nameDiv" + petArray.length;
    this.nameLable = document.createElement("LABLE");
    this.nameLable.id = "petNameLable" + petArray.length;
    this.Content = document.createTextNode(Petname);
    this.editBtn = document.createElement("i");
    this.editBtn.className = "fa fa-pen-square";
    this.editBtn.id = "editBtn" + petArray.length;
    this.nameLable.appendChild(this.Content);
    this.nameDiv.appendChild(this.nameLable);
    this.nameDiv.appendChild(this.editBtn);
    this.image = document.createElement("img");
    this.image.src = chrome.extension.getURL(
        "pet_image/" + this.picIndex + ".png"
    );
    this.image.width = "200";
    this.image.className = "row";
    this.petDiv.appendChild(this.nameDiv);
    this.petDiv.appendChild(this.image);
    this.petDiv.style =
        "position:fixed;left:" +
        Math.ceil(Math.random() * (window.innerWidth - 200)) +
        "px; top:" +
        Math.ceil(Math.random() * (window.innerHeight - 200)) +
        "px;z-index: 99999;";
    document.getElementsByTagName("body")[0].appendChild(this.petDiv);

    //object methods
    this.drag = function () {
        let dragSouce = document.querySelector("#imgNo" + petArray.length);
        let startX = 0;
        let startY = 0;

        dragSouce.addEventListener("mousedown", dragStart);

        function dragStart(e) {
            e.preventDefault();
            //記錄點擊相對被點擊物件的座標
            startX = e.clientX - dragSouce.offsetLeft;
            startY = e.clientY - dragSouce.offsetTop;
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", stop);
        }
        function move(e) {
            //計算出拖曳物件最左上角座標
            x = e.clientX - startX;
            y = e.clientY - startY;
            dragSouce.style.left = x + "px";
            dragSouce.style.top = y + "px";
        }

        function stop() {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", stop);
        }
    };

    this.flag = 0;
    this.time = 0;
    this.update = function () {
        this.time++;
        if (this.time > this.picSpeed) {
            this.time = 0;
            if (this.flag >= picNum) this.flag = 0;
            this.flag++;
            this.picIndex = this.picIndex.split('-', 1);
            this.picIndex = this.picIndex + "-" + this.flag.toString();
            this.image.src = chrome.extension.getURL(
                "pet_image/" + this.picIndex + ".png"
            );
        }
    };

    this.editPetName = function () {
        let btnEdit = document.querySelector("#editBtn" + petArray.length);
        let nameLabel = document.querySelector("#petNameLable" + petArray.length);
        let namediv = document.querySelector("#nameDiv" + petArray.length);
        btnEdit.addEventListener("click", editNameLabel);
        function editNameLabel() {
            btnEdit.style = "display:none;";
            nameLabel.style = "display:none;";
            nameInput = document.createElement("input");
            nameInput.setAttribute("type", "text");
            nameInput.setAttribute("value", Petname);
            namediv.appendChild(nameInput);
            nameInput.focus();
            saveBtn = document.createElement("i");
            saveBtn.className = "fa fa-check-circle ";
            namediv.appendChild(saveBtn);

            saveBtn.addEventListener("click", displayNameLabel);
            function displayNameLabel(e) {
                var newpetNameObj = null;
                chrome.storage.local.get(["Petname"], function (result) {
                    var newpetNameObj = result.Petname == undefined ? undefined : JSON.parse(result.Petname);
                    saveBtn.style = "display:none;";
                    nameInput.style = "display:none;";
                    btnEdit.style = "display:inline ;";
                    nameLabel.style = "display:inline;";
                    //nameLabel.innerHTML = nameInput.value;
                    //Petname = nameInput.value;
                    
                    var nameObject = newpetNameObj;
                    if (nameObject == undefined) {
                        nameObject = {
                            Pisuke: "",
                            Bear: "",
                            Dragon: "",
                            Elizabeth: "",
                            pet5: "",
                            PinkBear: ""
                        };
                    }
                    switch (petType) {
                        case "Pisuke":
                            nameObject.Pisuke = nameInput.value;
                            break;
                        case "Bear":
                            nameObject.Bear = nameInput.value;
                            break;
                        case "Dragon":
                            nameObject.Dragon = nameInput.value;
                            break;
                        case "Elizabeth":
                            nameObject.Elizabeth = nameInput.value;
                            break;
                        case "pet5":
                            nameObject.pet5 = nameInput.value;
                            break;
                        case "PinkBear":
                            nameObject.PinkBear = nameInput.value;
                            break;
                    }
                    chrome.storage.local.set(
                        { Petname: JSON.stringify(nameObject) },
                        function () {
                            nameLabel.innerHTML = nameInput.value;
                            console.log(JSON.stringify(nameObject));
                        }
                    );
                });
                
            }
        }
    };
    document.getElementsByTagName("head")[0].insertAdjacentHTML(
        "beforeend",
        "<link type=\"text/css\" rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\" />");
    //object action
    this.drag();
    this.editPetName();
}

animate = function () {
    requestAnimationFrame(animate);
    for (var i = 0; i < petArray.length; i++) {
        petArray[i].update();
    }
};
animate();
