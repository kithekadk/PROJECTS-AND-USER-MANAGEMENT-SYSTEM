CREATE PROCEDURE createUser (@firstName VARCHAR(200),@lastName VARCHAR(200),@email VARCHAR(200),@password VARCHAR(200))
AS
BEGIN
	IF EXISTS (SELECT * FROM USERS WHERE email=@email)
	BEGIN 
	RAISERROR ('Email Taken, try a different email',11,1);
	END

	BEGIN
		INSERT INTO USERS (firstName,lastName,email,password) 
		VALUES(@firstName,@lastName, @email, @password)
	END
END