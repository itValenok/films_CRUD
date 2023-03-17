CREATE TABLE IF NOT EXISTS public.film
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    title text COLLATE pg_catalog."default" NOT NULL,
    "yearProduction" date NOT NULL,
    CONSTRAINT film_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.film
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.genre
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    title text COLLATE pg_catalog."default" NOT NULL,
    film_id bigint NOT NULL,
    CONSTRAINT genre_pkey PRIMARY KEY (id),
    CONSTRAINT fk_film FOREIGN KEY (film_id)
        REFERENCES public.film (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.genre
    OWNER to postgres;