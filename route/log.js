import express from "express";
import bodyParser from "body-parser";
import { geh, Register, Login} from "../controller/log.js";
import midWare from "../middlewares/protectedResource.js";

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get('/log', midWare, geh);

router.post('/register', Register);

router.post("/login", Login);

export default router;