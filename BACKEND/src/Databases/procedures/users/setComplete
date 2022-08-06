CREATE PROCEDURE setComplete (@projectId INT, @userId VARCHAR(200))
AS 
BEGIN
	IF EXISTS (SELECT * FROM dbo.PROJECTS WHERE projectId= @projectId AND status=0)

	BEGIN
		UPDATE PROJECTS SET status = 1 WHERE projectId= @projectId;
	END
	ELSE

	BEGIN
		RAISERROR('No pending project with that ProjectId',11,1);
	END
END