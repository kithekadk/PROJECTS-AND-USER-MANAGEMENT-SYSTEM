CREATE PROCEDURE deleteProject (@projectId VARCHAR(200))
AS
BEGIN
IF EXISTS (SELECT projectId FROM dbo.PROJECTS WHERE projectId=@projectId)
BEGIN
	DELETE FROM dbo.PROJECTS WHERE projectId=@projectId;
	RETURN;
END
BEGIN
	RAISERROR('No Task With That ID', 11,1);
END
END