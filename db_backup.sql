--
-- PostgreSQL database dump
--

-- Dumped from database version 11.7
-- Dumped by pg_dump version 11.7

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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: commitment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commitment (
    person integer NOT NULL,
    service character varying(30) NOT NULL,
    commitment_type character varying(30) NOT NULL,
    amount_of_work character varying(30),
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.commitment OWNER TO postgres;

--
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    description text,
    img character varying(30) NOT NULL,
    contact_reference integer NOT NULL,
    location character varying(30) NOT NULL,
    city character varying(30) NOT NULL,
    max_participants integer,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.event OWNER TO postgres;

--
-- Name: event_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.event_id_seq OWNER TO postgres;

--
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_id_seq OWNED BY public.event.id;


--
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    surname character varying(30) NOT NULL,
    img character varying(30),
    email character varying(30) NOT NULL,
    phone character varying(15),
    description text NOT NULL,
    role character varying(30) NOT NULL,
    birthday date,
    gender character varying(15)
);


ALTER TABLE public.person OWNER TO postgres;

--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.person_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_id_seq OWNER TO postgres;

--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- Name: service; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.service (
    name character varying(30) NOT NULL,
    event integer NOT NULL,
    description text,
    mission text,
    img character varying(30) NOT NULL,
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.service OWNER TO postgres;

--
-- Name: sponsor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sponsor (
    name character varying(30) NOT NULL,
    company character varying(30) NOT NULL,
    img character varying(30),
    description text
);


ALTER TABLE public.sponsor OWNER TO postgres;

--
-- Name: sponsorship; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sponsorship (
    sponsor character varying(30) NOT NULL,
    event integer NOT NULL,
    amount_of_money character varying(30),
    date timestamp without time zone NOT NULL
);


ALTER TABLE public.sponsorship OWNER TO postgres;

--
-- Name: event id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event ALTER COLUMN id SET DEFAULT nextval('public.event_id_seq'::regclass);


--
-- Name: person id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- Data for Name: commitment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.commitment VALUES (1, 'Service1', 'asd', NULL, '2000-11-11 11:11:11');
INSERT INTO public.commitment VALUES (2, 'Service1', 'asdasd', NULL, '2000-11-11 11:11:11');


--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.event VALUES (2, 'Event1', 'asdasd', 'asdasd', 1, 'asd', 'asd', NULL, '2020-12-12 12:12:21');
INSERT INTO public.event VALUES (3, 'Event2', '', 'asd', 2, 'asd', 'asd', 12, '2000-11-11 11:11:11');
INSERT INTO public.event VALUES (4, 'Event3', 'asdasd', 'asdasd', 3, 'asd', 'asd', NULL, '2010-11-11 11:11:11');


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.person VALUES (1, 'Gino', 'asd', NULL, 'asd', NULL, 'asd', 'asd', NULL, NULL);
INSERT INTO public.person VALUES (2, 'Gino', 'Pino', 'asd', 'asd@gmail.vom', NULL, 'asdasdasd', 'asdasd', NULL, NULL);
INSERT INTO public.person VALUES (3, 'Dino', 'Zino', 'asd', 'asdasd@mail.com', 'asd', 'asdasdasdasd', 'asdasd', NULL, NULL);
INSERT INTO public.person VALUES (4, 'Vino', 'asd', 'asd', 'asd', 'asd', 'asd', 'asd', NULL, NULL);


--
-- Data for Name: service; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.service VALUES ('Service1', 3, NULL, NULL, 'qwe', '2000-11-11 11:11:11');
INSERT INTO public.service VALUES ('Service2', 2, NULL, NULL, 'asd', '2020-11-11 11:11:11');


--
-- Data for Name: sponsor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sponsor VALUES ('Gigino', 'Barilla', NULL, NULL);
INSERT INTO public.sponsor VALUES ('Mino', 'FCA', NULL, NULL);


--
-- Data for Name: sponsorship; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sponsorship VALUES ('Gigino', 3, NULL, '2000-11-11 11:11:11');
INSERT INTO public.sponsorship VALUES ('Mino', 3, NULL, '2019-05-20 20:31:40.319');


--
-- Name: event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_id_seq', 4, true);


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.person_id_seq', 3, true);


--
-- Name: commitment commitment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commitment
    ADD CONSTRAINT commitment_pkey PRIMARY KEY (person, service);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: person person_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pkey PRIMARY KEY (id);


--
-- Name: service service_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_pkey PRIMARY KEY (name);


--
-- Name: sponsor sponsor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sponsor
    ADD CONSTRAINT sponsor_pkey PRIMARY KEY (name);


--
-- Name: sponsorship sponsorship_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sponsorship
    ADD CONSTRAINT sponsorship_pkey PRIMARY KEY (sponsor, event);


--
-- Name: commitment commitment_person_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commitment
    ADD CONSTRAINT commitment_person_fkey FOREIGN KEY (person) REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: commitment commitment_service_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commitment
    ADD CONSTRAINT commitment_service_fkey FOREIGN KEY (service) REFERENCES public.service(name) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: event event_contact_reference_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_contact_reference_fkey FOREIGN KEY (contact_reference) REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: service service_event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.service
    ADD CONSTRAINT service_event_fkey FOREIGN KEY (event) REFERENCES public.event(id);


--
-- Name: sponsorship sponsorship_event_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sponsorship
    ADD CONSTRAINT sponsorship_event_fkey FOREIGN KEY (event) REFERENCES public.event(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: sponsorship sponsorship_sponsor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sponsorship
    ADD CONSTRAINT sponsorship_sponsor_fkey FOREIGN KEY (sponsor) REFERENCES public.sponsor(name) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

