CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    username character varying(256) COLLATE pg_catalog."default" NOT NULL,
    password character varying(512) COLLATE pg_catalog."default" NOT NULL,
    email character varying(256) COLLATE pg_catalog."default",
    uuid character varying(512) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)