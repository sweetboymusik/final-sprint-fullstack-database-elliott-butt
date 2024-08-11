CREATE TABLE public.logs
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    keyword character varying NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
