
CREATE PROCEDURE IdleUsers
AS
BEGIN
	SELECT u.userId FROM dbo.USERS u LEFT JOIN dbo.PROJECTS p ON  p.userId= u.userId
		EXCEPT
	SELECT u.userId FROM dbo.USERS u INNER JOIN dbo.PROJECTS p ON  p.userId= u.userId
END