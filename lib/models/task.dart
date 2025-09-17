class GardenTask {
  const GardenTask({
    required this.id,
    required this.title,
    required this.description,
    required this.dueDate,
    this.isCompleted = false,
  });

  final String id;
  final String title;
  final String description;
  final DateTime dueDate;
  final bool isCompleted;
}
