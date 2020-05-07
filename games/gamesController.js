const express = require("express");
const router = express.Router();
const dbgames = require("./games");

router.get("/games", (req, res) => {
    dbgames.findAll().then((ListGames) => {
        res.json(ListGames);
    })
});

router.get("/games/:title", (req, res) => {
    var title = req.params.title;
    if (!isNaN(title)) {
        res.sendStatus(400);
    } else {
        dbgames.findAll({ where: { title: title } }).then((game) => {
            if (game != undefined) {
                res.statusCode = 200;
                res.json(game);
            }
            else {
                res.sendStatus(404);
                res.json(title);
            }
        })
    }

})

router.post("/games", (req, res) => {
    var { title, price, year } = req.body;

    dbgames.create({
        title,
        price,
        year
    });
    res.sendStatus(200);
})

router.delete("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = parseInt(req.params.id);

        try {
            dbgames.destroy({ where: { id: id } });
            res.sendStatus(200);

        } catch (error) {
            res.sendStatus(404);
        }

    }

})

router.put("/games/:id", (req, res) => {    
    var { title, price, year } = req.body;

    if (isNaN(req.params.id)) {
        res.sendStatus(400);

    } else {
        var id = parseInt(req.params.id);

        if (id != undefined) {

            if (title != undefined) {
                dbgames.update({ title: title }, { where: { id: id } });
            }
            if (price != undefined) {
                dbgames.update({ price: price }, { where: { id: id } });
            }
            if (year != undefined) {
                dbgames.update({ year: year }, { where: { id: id } });
            }

            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    }
})


module.exports = router;