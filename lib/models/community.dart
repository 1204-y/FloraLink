class CommunityGroup {
  const CommunityGroup({
    required this.id,
    required this.name,
    required this.description,
    required this.memberCount,
    required this.isLocal,
    this.coverImage,
  });

  final String id;
  final String name;
  final String description;
  final int memberCount;
  final bool isLocal;
  final String? coverImage;
}

class CommunityPost {
  const CommunityPost({
    required this.id,
    required this.author,
    required this.title,
    required this.content,
    required this.publishedAt,
    this.imageUrl,
    this.groupName,
  });

  final String id;
  final String author;
  final String title;
  final String content;
  final DateTime publishedAt;
  final String? imageUrl;
  final String? groupName;
}
