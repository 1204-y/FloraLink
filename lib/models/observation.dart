class Observation {
  const Observation({
    required this.id,
    required this.title,
    required this.description,
    required this.latitude,
    required this.longitude,
    required this.observedAt,
    this.locationName,
    this.imageUrl,
  });

  final String id;
  final String title;
  final String description;
  final double latitude;
  final double longitude;
  final DateTime observedAt;
  final String? locationName;
  final String? imageUrl;
}
