CREATE PROCEDURE loginUser (@email VARCHAR(200), @password VARCHAR(200))
AS
BEGIN
	IF EXISTS (SELECT * FROM dbo.USERS WHERE email = @email)
		BEGIN
			SELECT * FROM dbo.USERS WHERE email = @email AND password= @password;
		END
		ELSE
		BEGIN
			RAISERROR ('User account NOT found',11,1)
		END
END