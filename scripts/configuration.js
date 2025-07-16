window.addEventListener("DOMContentLoaded", function () {
    const lists = ["players", "levels"];
    for (const list of lists) {
        displayItems(list);
        refreshSelectList(list);
    }
    target_player.addEventListener("change", toggleGenderSelect);
});

/* ------- ADD ITEM ------- */

const add_btns = document.querySelectorAll(".add-btn");
add_btns.forEach(btn => {
    btn.addEventListener("click", function() {
        if (btn.id == "addPlayer-btn") {
            const name = document.getElementById('newPlayerName');
            const gender = document.getElementById('newPlayerGender');

            if (!name.value.trim()) return alert("Le nom du joueur ne doit pas être vide");

            addItem({
                'name': name.value,
                'gender': gender.value,
            }, "players");
            name.value = null;
            gender.value = "none";
        }
        if (btn.id == "addLevel-btn") {
            const level = document.getElementById('newLevel');

            if (!level.value.trim()) return alert("Le nom du niveau ne doit pas être vide");
            
            addItem({ 'level': level.value }, "levels");
            level.value = null;
        }
    });
});

function addItem (item, array) {
    const list = JSON.parse(localStorage.getItem(array)) || [];
    list.push(item);
    localStorage.setItem(array, JSON.stringify(list));

    displayItems(array);
    refreshSelectList(array);
}


/* ------- REMOVE ITEM ------- */

const delete_buttons = document.querySelectorAll(".deleteItem-btn");
delete_buttons.forEach(btn => {
    btn.addEventListener("click", function() {
        if (btn.id == "deletePayer-btn") {
            const name = btn.getAttribute('data-name');
            const gender = btn.getAttribute('data-gender');

            removeItem({ name, gender }, "players");
        }
        if (btn.id == "addLevel-btn") {
            const level = document.getElementById('newLevel');
            removeItem({ level }, "levels");
        }
    });
});

function removeItem (item, array) {
    const list = JSON.parse(localStorage.getItem(array)) || [];
    const updateItems = list.filter(cur_item =>
        array == "players" ?
        !(cur_item.name === item.name && cur_item.gender === item.gender) :
        cur_item.level !== item.level
    );
    localStorage.setItem(array, JSON.stringify(updateItems));

    displayItems(array);
    refreshSelectList(array);
    refreshCheckboxes();
}


/* ------- DISPLAY ITEMS ------- */

function displayItems(array) {
    const list = JSON.parse(localStorage.getItem(array)) || [];
    const listElement = document.getElementById(`${array}List`);
    listElement.querySelectorAll("button").forEach(button => button.remove());

    const config = {
        players: {
            className: "deletePlayer-btn deleteItem-btn",
            createText: item => {
                const genderIcon = item.gender !== 'none' ? `<img src="/datas/${item.gender}-icon.svg">` : '';
                return `${genderIcon}${item.name}<span class="delete-btn">×</span>`;
            },
            setAttributes: (button, item) => {
                button.setAttribute("data-name", item.name);
                button.setAttribute("data-gender", item.gender);
            },
            emptyMessageSelector: "#players-list-empty-message",
            optionalMessageSelector: "#players-optional",
            showOptional: list.length < 2
        },
        levels: {
            className: "deleteLevel-btn deleteItem-btn",
            createText: item => `${item.level}<span class="delete-btn">×</span>`,
            setAttributes: (button, item) => {
                button.setAttribute("data-level", item.level);
            },
            emptyMessageSelector: "#levels-list-empty-message",
            optionalMessageSelector: null,
            showOptional: false
        }
    };

    const { className, createText, setAttributes, emptyMessageSelector, optionalMessageSelector, showOptional } = config[array];

    for (const item of list) {
        const button = document.createElement("button");
        button.className = className;
        button.innerHTML = createText(item);
        setAttributes(button, item);

        button.addEventListener("click", function () {
            removeItem(item, array);
        });

        listElement.appendChild(button);
    }

    toggleActive(document.querySelector(emptyMessageSelector), list.length === 0);

    if (optionalMessageSelector) {
        toggleActive(document.querySelector(optionalMessageSelector), showOptional);
    }
}

function toggleActive (element, boolean) {
    if (boolean) {
        element.classList.remove("inactive");
        element.classList.add("active");
    } else {
        element.classList.add("inactive");
        element.classList.remove("active");
    }
}


/* ------- ADD SELECT ITEMS ------- */

function refreshSelectList (array) {
    const list = JSON.parse(localStorage.getItem(array)) || [];
    const listElements = document.querySelectorAll(`.select.${array}SelectList`);

    listElements.forEach(select => {
        select.querySelectorAll("option").forEach(option => {
            if (!option.classList.contains('default-option')) {
                option.remove();
            }
        });

        for (const item of list) {
            let value;
            if (array == "players") value = item.name;
            if (array == "levels") value = item.level;

            const option = document.createElement("option");
            option.className = "opt-style";
            option.setAttribute("value", value);
            option.textContent = value;

            select.appendChild(option);
        }
    });
}

/* ------- SELECT DISABLE ------- */

const target_player = document.querySelector("#targetPlayer");
const target_gender = document.querySelector("#targetGender");

function toggleGenderSelect () {
    if (target_player.value == "all") {
        target_gender.removeAttribute("disabled");
    } else {
        target_gender.value = "all";
        target_gender.setAttribute("disabled", "");
    };
}