SELECT 
	title,
	authors.first_name || ' ' || authors.last_name AS author,
	genres.name AS genre,
	publishers.name AS publisher,
	publication_date
FROM
	books
JOIN 
	authors
	ON books.author_id = authors.id
JOIN 
	genres
	ON books.genre_id = genres.id
JOIN 
	publishers
	ON books.publisher_id = publishers.id
WHERE
	title iLIKE $1
	OR authors.first_name iLIKE $1
	OR authors.last_name iLIKE $1
	OR genres.name iLIKE $1
	OR publishers.name iLIKE $1
	OR CAST(publication_date AS VARCHAR) iLIKE $1
ORDER BY
