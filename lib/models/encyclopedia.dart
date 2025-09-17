class EncyclopediaEntry {
  const EncyclopediaEntry({
    required this.id,
    required this.commonName,
    required this.scientificName,
    required this.category,
    required this.careLevel,
    required this.lightRequirement,
    required this.wateringFrequency,
    required this.description,
    this.imageUrl,
  });

  final String id;
  final String commonName;
  final String scientificName;
  final String category;
  final String careLevel;
  final String lightRequirement;
  final String wateringFrequency;
  final String description;
  final String? imageUrl;
}
