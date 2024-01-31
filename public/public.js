const createPeopleContainer = function () {
    const $peopleContainer = $('<div>This is the peopleContainer</div>')
    $peopleContainer.addClass("container");

    const $clickable = $('<div>Show All</div>');
    $clickable.addClass("clickable");
    $clickable.on('click', () => {
        fetch("person")
        .then((fetchResult) => {
            //turn fetchResult from string into json
            return fetchResult.json();
        })
        .then((jsonData) => {
            console.log(`pass jsonData into showPeople`);
            showPeople(jsonData);
            console.log("f: showPeople finished")
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
    const $bakedGoodsContainer = $('<div>This is the bakedGoodsContainer</div>')
    $bakedGoodsContainer.addClass("container");

    const $clickable = $('<div>Show All Baked Goods</div>')
    $clickable.addClass("clickable");
    $clickable.on('click', () => {
        fetch("baked_goods")
        .then((fetchResult) => {
            //turn fetchResult from string into json
            return fetchResult.json();
        })
        .then((jsonData) => {
            console.log(`pass jsonData into showBakedGoods`);
            showBakedGoods(jsonData);
            console.log("f: showBakedGoods finished")
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500); 
        })
    });

    $("body").append($bakedGoodsContainer);
    $("body").append($clickable);
}

//show all people in person table
const showPeople = function (people) {
    console.log(`inside f:showPeople`)
    console.log(people);

    for (let person of people) {
        //create personDiv container to append later
        const $personDiv = $(`<div>${person.person_name}</div>`);
        $personDiv.addClass("container");
        //append #personDiv to people container
        $("body").append($personDiv);
    }
}

//show all baked goods in baked_goods table
const showBakedGoods = function (baked_goods) {
    console.log(`inside f:showbg`)
    console.log(baked_goods);

    for (let baked_good of bake_goods) {
        const $bgDiv = $(`<div>${baked_good.baked_goods_name}: ${baked_good.baked_goods_price} copper</div>`);
        $bgDiv.addClass("container");
        $("body").append($bgDiv);
    }
}

createPeopleContainer();
createBakedGoodsContainer();

