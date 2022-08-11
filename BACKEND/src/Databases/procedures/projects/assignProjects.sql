CREATE PROCEDURE assignProject(@userId VARCHAR(200), @projectId VARCHAR(200))
AS
BEGIN
	IF EXISTS (SELECT * FROM dbo.PROJECTS WHERE projectId = @projectId AND userId IS NULL)
		BEGIN
			IF EXISTS (SELECT * FROM dbo.PROJECTS WHERE userId=@userId)
				BEGIN
					RAISERROR('User working on another project',11,1);
				END
				ELSE
				BEGIN
					update PROJECTS set userId= @userId where projectId=@projectId;
				END
		END
	ELSE
		BEGIN
			RAISERROR ('Invalid project Id or Project Already assigned',11,1);
		END
END