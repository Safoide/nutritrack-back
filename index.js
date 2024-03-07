import express from "express";
import cors from "cors";


// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-4432443997002159-030216-73b257a0e7229b252d28e8b4f3f466a5-1709852660' });



const app = express()
const port = 3000

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("soy el server :)");
});

app.post("/create_preference", async (req, res) => {
    console.log(req.body);
    try {
        const body = {
            items: [{
                title: req.body.title,
                quantity: Number(req.body.quantity),
                unit_price: Number(req.body.price),
                currency_id: "ARS",
            }],
            back_urls: {
                success: "https://nutri-track.netlify.app/success",
                failure: "https://nutri-track.netlify.app/failure",
                pending: "https://nutri-track.netlify.app/pending"
                
            },
            auto_return: "approved",
        };

        const preference = new Preference(client);
        const result = await preference.create({ body });
        res.json({
            id:result.id,
        });
    } catch {
        console.log(error)
        res.status(500).json({
            error: "Error al crear la preferencia :(",
        });
    }
});

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
});