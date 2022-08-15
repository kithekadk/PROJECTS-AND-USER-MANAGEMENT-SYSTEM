CREATE PROCEDURE displayAllUsers
AS
BEGIN
	SELECT userId, firstName, lastName,email FROM dbo.USERS WHERE role = 0
END