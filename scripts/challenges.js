const addChallenge_btn = document.querySelector("#addChallenge-btn");

addChallenge_btn.addEventListener("click", function () {
    
    const challenge = document.getElementById('newChallenge');
    const target_player = document.getElementById('targetPlayer');
    const target_gender = document.getElementById('targetGender');
    const type = document.getElementById('challengeType');
    const level = document.getElementById('challengeLevel');

    if (!challenge.value.trim()) return alert("Le défi ne doit pas être vide");

    const list = JSON.parse(localStorage.getItem("challenges")) || [];
    const id = !list[list.length - 1]?.id ? 0 : list[list.length - 1].id + 1;

    const item = {
        id,
        'challenge': challenge.value,
        'target_player': target_player.value,
        'target_gender': target_gender.value,
        'type': type.value,
        'level': level.value };
    list.push(item);
    localStorage.setItem("challenges", JSON.stringify(list));
    
    challenge.value = null;
    target_player.value = "all";
    target_gender.value = "all";
    type.value = "action";
    type.level = "all";
});