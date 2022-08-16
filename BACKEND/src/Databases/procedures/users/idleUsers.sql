-- CREATE PROCEDURE IdleUsers
-- AS
-- BEGIN
-- 	SELECT email FROM dbo.USERS u LEFT JOIN dbo.PROJECTS p ON  p.userId= u.userId
-- 		EXCEPT
-- 	SELECT email FROM dbo.USERS u INNER JOIN dbo.PROJECTS p ON  p.userId= u.userId
-- END

CREATE PROCEDURE IdleUsers
AS
BEGIN
	SELECT * FROM dbo.USERS u LEFT JOIN dbo.PROJECTS p ON  p.userId= u.userId
		EXCEPT
	SELECT * FROM dbo.USERS u INNER JOIN dbo.PROJECTS p ON  p.userId= u.userId
END