CREATE PROCEDURE createTask (@projectName VARCHAR(200), 
@description VARCHAR(200), @deadline VARCHAR(200) , @userId VARCHAR(200))
AS
BEGIN

IF EXISTS ( SELECT * FROM dbo.PROJECTS WHERE projectName=@projectName)
BEGIN
		RAISERROR('PROJECT EXISTS', 11, 1);
		return;
END
ELSE 
	BEGIN


	INSERT INTO dbo.PROJECTS (projectName, description, deadline, userId)
	VALUES (@projectName, @description, @deadline, @userId)
END
END