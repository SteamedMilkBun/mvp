const createPeopleContainer = function () {
    const $peopleContainer = $('<div></div>')
    $peopleContainer.addClass("people-container");

    const $clickable = $('<div>Show All People</div>');
    $clickable.addClass("clickable");
    $clickable.on('click', () => {
        
        fetch("person")
        .then((fetchResult) => {
            return fetchResult.json();
        })
        .then((jsonData) => {
            showPeople(jsonData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500); 
        })
    });

    $("body").append($peopleContainer);
    $("body").append($clickable);
}

const createBakedGoodsContainer = function () {
    const $bakedGoodsContainer = $('<div></div>')
    $bakedGoodsContainer.addClass("bg-container");
    $("body").append($bakedGoodsContainer);

    const $clickable = $('<div>Show All Baked Goods</div>')
    $clickable.addClass("clickable");
    $clickable.on('click', () => {
        fetch("baked_goods")
        .then((fetchResult) => {
            return fetchResult.json();
        })
        .then((jsonData) => {
            showBakedGoods(jsonData);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500); 
        })
    });

    $("body").append($clickable);
}

//show all people in person table
const showPeople = function (people) {
    $(".people-container").empty();
    for (let person of people) {
        //create personDiv container to append later
        const $personDiv = $(`<div>${person.person_name}</div>`);
        $personDiv.addClass("container");
        //append #personDiv to people container
        $(".person-container").append($personDiv);
    }
}

//show all baked goods in baked_goods table
const showBakedGoods = function (baked_goods) {
    console.log("clear bg container")
    $(".bg-container").empty();
    for (let baked_good of baked_goods) {
        const $bgDiv = $(`<div>${baked_good.baked_goods_name}: ${baked_good.baked_goods_price} copper</div>`);
        $bgDiv.addClass("container");
        $(".bg-container").append($bgDiv);
        console.log("appended bg container");
    }
}

createPeopleContainer();
createBakedGoodsContainer();

