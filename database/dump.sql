--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.14 (Ubuntu 10.14-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public."products_productId_seq";
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
82	23	1	2999
83	23	2	2595
84	23	3	2900
85	23	4	999
86	24	1	2999
87	24	1	2999
88	24	2	2595
89	24	5	9900
90	24	3	2900
91	25	2	2595
92	25	2	2595
93	24	3	2900
94	24	3	2900
95	24	1	2999
96	24	1	2999
97	26	4	999
98	24	1	2999
99	24	1	2999
100	27	2	2595
101	28	3	2900
102	28	5	9900
103	28	2	2595
104	28	1	2999
105	28	1	2999
106	29	3	2900
107	29	6	830
108	29	3	2900
109	30	3	2900
110	30	3	2900
111	30	2	2595
112	31	2	2595
113	31	2	2595
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
24	2020-11-06 09:08:10.279235-08
25	2020-11-06 11:27:19.358638-08
26	2020-11-06 19:40:24.767602-08
27	2020-11-07 19:31:30.776284-08
28	2020-11-07 19:34:48.329794-08
29	2020-11-07 20:22:56.53505-08
30	2020-11-07 20:33:46.098992-08
31	2020-11-16 15:44:06.790057-08
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
1	25	Jason	1234566665	123 lets go st	2020-11-06 12:02:34.782833-08
2	26	Jason	1234566665	55555 champion	2020-11-06 19:40:43.179053-08
3	27	Jason	1234566665	55555 champion	2020-11-07 19:31:40.363696-08
4	28	adsfds	343432	asdfsaf	2020-11-07 20:16:29.318395-08
5	28	KOBEEE	234324	Lakers Street 	2020-11-07 20:17:51.804652-08
6	29	Julie	3245325345	Fullerton	2020-11-07 20:28:35.805167-08
7	30	Jason Derullo	234324	Los Angeles Ca	2020-11-07 20:38:50.597939-08
8	31	Stephen Curry	12344555	San Francisco, CA	2020-11-16 15:45:02.959732-08
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
7	Shaq and Magic Signed Basketball	25000	/images/bball-signed.webp	Dual Signed Los Angeles Lakers Shaquille O' Neal and  Magic Johnson Fanatics Authentic Indoor/Outdoor Basketball	This basketball has been personally hand-signed by Shaquille O' Neal and Magic Johnson. It is officially licensed by the National Basketball Associated and comes with an individually numbered, tamper-evident hologram from Fanatic Authentic.To ensure authenticity,the hologram can be reviewed online. This process helps to ensure that the product purchased is authentic and eliminates any possibility of duplication or fraud.
8	Aaron Rodgers Signed Helmet	60000	/images/rodgers-helmet.webp	Aaron Rodgers Green Bay Packers Autographed Authentic Riddell Proline Helmet with individually numbered, tamper-evident hologram	This helmet has been personally hand-signed by Aaron Rodgers. It is officially licensed by the National Football League and comes with an individually numbered, tamper-evident hologram from Fanatics Authentic. To ensure authenticity, the hologram can be reviewed online. This process helps to ensure that the product purchased is authentic and eliminates any possibilty of duplication or fraud.
9	Stephen Curry Signed Funko Pop	30000	/images/curry-toy.webp	 Autographed Golden State Warriors Stephen Curry Fanatics Authentic Funko Pop! Figurine - Limited Edition of 100	 This figurine has been personally hand-signed by Stephen Curry. It is officially licensed by the National Basketball Association and comes with an individually numbered, tamper-evident hologram from Fanatics Authentic. To ensure authenticity, the hologram can be reviewed online. This process helps to ensure that the product purchased is authentic and eliminates any possibility of duplication or fraud. This is a limited edition of 100.
10	Kobe Bryant Sublimated Plaque	8100	/images/kobe-signed.webp	Los Angeles Lakers Kobe Bryant Fanatics Authentic 10.5" x 13" 60 Point Finale Sublimated Plaque	Commemorate Kobe Bryant scoring 60 points in his last NBA game with this sublimated plaque. Each collectible comes an 8" x 10" image and descriptive text sublimated onto a black plaque. The product is officially licensed by the National Basketball Association. It measures 10.5" x 13" x 1" and comes ready to hang in any home or office.
11	Cooper Kupp Signed Football	12099	/images/kupp-ball.webp	Autographed Los Angeles Rams Cooper Kupp Fanatics Authentic Jarden 2020 Logo White Panel Football	This football has been personally hand-signed by Cooper Kupp. It is officially licensed by the National Football League and comes with an individually numbered, tamper-evident hologram from Fanatics Authentic. To ensure authenticity, the hologram can be reviewed online. This process helps to ensure that the product purchased is authentic and eliminates any possibility of duplication or fraud.
12	Mike Trout Signed Baseball	80000	/images/trout-baseball.jpg	 Los Angeles Angels Mike Trout Fanatics Authentic Autographed Baseball and 2018 MLB All-Star Game Gold Glove Display Case with Image	This acrylic display case comes with an image and a baseball personally hand signed by Mike Trout, a sublimated nameplate and a black acrylic base with a gold colored glove. It also features a clear acrylic removable lid. It has been obtained under the auspices of the MLB Authentication Program and can be verified by its numbered hologram at MLB.com. It also comes with an individually numbered, tamper-evident hologram from Fanatics Authentic. To ensure authenticity, the hologram can be reviewed online. This process helps to ensure that the product purchased is authentic and eliminates any possibility of duplication or fraud. Measures 10' x 5' x 5.5'
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 113, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 31, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 8, true);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 12, true);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

