import 'dart:math';

import 'package:flutter/foundation.dart';

import '../models/models.dart';

class MockRepository extends ChangeNotifier {
  MockRepository() {
    _seedData();
  }

  final List<Plant> _plants = <Plant>[];
  final List<GardenTask> _tasks = <GardenTask>[];
  final List<CommunityGroup> _groups = <CommunityGroup>[];
  final List<CommunityPost> _posts = <CommunityPost>[];
  final List<Observation> _observations = <Observation>[];
  final List<EncyclopediaEntry> _encyclopedia = <EncyclopediaEntry>[];
  final List<AssistantMessage> _messages = <AssistantMessage>[];

  List<Plant> get plants => List<Plant>.unmodifiable(_plants);
  List<GardenTask> get tasks => List<GardenTask>.unmodifiable(_tasks);
  List<CommunityGroup> get groups => List<CommunityGroup>.unmodifiable(_groups);
  List<CommunityPost> get posts => List<CommunityPost>.unmodifiable(_posts);
  List<Observation> get observations => List<Observation>.unmodifiable(_observations);
  List<EncyclopediaEntry> get encyclopedia => List<EncyclopediaEntry>.unmodifiable(_encyclopedia);
  List<AssistantMessage> get messages => List<AssistantMessage>.unmodifiable(_messages);

  void addAssistantMessage(AssistantMessage message) {
    _messages.add(message);
    notifyListeners();
  }

  void addUserQuestion(String question) {
    _messages.add(AssistantMessage(
      id: 'u-${DateTime.now().millisecondsSinceEpoch}',
      role: MessageRole.user,
      content: question,
      createdAt: DateTime.now(),
    ));
    notifyListeners();
  }

  void addObservation(Observation observation) {
    _observations.insert(0, observation);
    notifyListeners();
  }

  void markTaskCompleted(String taskId) {
    final index = _tasks.indexWhere((task) => task.id == taskId);
    if (index == -1) {
      return;
    }
    final task = _tasks[index];
    _tasks[index] = GardenTask(
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      isCompleted: true,
    );
    notifyListeners();
  }

  void _seedData() {
    final now = DateTime.now();
    final random = Random(7);

    for (var i = 0; i < 6; i++) {
      _plants.add(Plant(
        id: 'plant-$i',
        name: '月季 · No.$i',
        species: 'Rosa chinensis',
        location: i % 2 == 0 ? '阳台北侧' : '庭院花坛',
        imageUrl: 'assets/images/plant_$i.jpg',
        healthStatus: PlantHealthStatus.values[i % PlantHealthStatus.values.length],
        lastWateredAt: now.subtract(Duration(days: random.nextInt(5))),
        tags: <String>['花期盛放', '香气淡雅'],
        timeline: List<GrowthRecord>.generate(4, (index) {
          return GrowthRecord(
            date: now.subtract(Duration(days: index * 7 + random.nextInt(3))),
            note: '第${index + 1}次花开，花色比上次更浓郁。',
            photoUrl: 'assets/images/plant_${i}_$index.jpg',
          );
        }),
      ));
    }

    for (var i = 0; i < 5; i++) {
      _tasks.add(GardenTask(
        id: 'task-$i',
        title: i.isEven ? '月季修剪' : '多肉浇水',
        description: i.isEven ? '剪除残花并保持通风，防止病害。' : '保持盆土微湿，避免积水。',
        dueDate: now.add(Duration(days: i - 1)),
        isCompleted: i == 0,
      ));
    }

    for (var i = 0; i < 4; i++) {
      _groups.add(CommunityGroup(
        id: 'group-$i',
        name: i.isEven ? '成都月季群' : '多肉慢慢聊',
        description: '分享花期、经验与线下活动的暖心社区。',
        memberCount: 1200 + random.nextInt(600),
        isLocal: i.isEven,
        coverImage: 'assets/images/group_$i.jpg',
      ));
    }

    for (var i = 0; i < 6; i++) {
      _posts.add(CommunityPost(
        id: 'post-$i',
        author: '花友$i',
        title: i.isEven ? '春季养护记录' : '今晚月季月光色',
        content: '今天的花儿比昨天更灿烂，分享一组照片给大家。',
        publishedAt: now.subtract(Duration(hours: i * 3)),
        imageUrl: 'assets/images/post_$i.jpg',
        groupName: i.isEven ? '成都月季群' : '多肉慢慢聊',
      ));
    }

    for (var i = 0; i < 5; i++) {
      _observations.add(Observation(
        id: 'observation-$i',
        title: '杜鹃花爆开第${i + 1}天',
        description: '色彩逐渐加深，吸引了很多路人。',
        latitude: 30.5728 + random.nextDouble() / 50,
        longitude: 104.0668 + random.nextDouble() / 50,
        observedAt: now.subtract(Duration(days: i)),
        locationName: '成都·望江楼公园',
        imageUrl: 'assets/images/observation_$i.jpg',
      ));
    }

    for (var i = 0; i < 8; i++) {
      _encyclopedia.add(EncyclopediaEntry(
        id: 'encyclopedia-$i',
        commonName: i.isEven ? '茶花' : '绣球',
        scientificName: i.isEven ? 'Camellia japonica' : 'Hydrangea macrophylla',
        category: i.isEven ? '常绿灌木' : '观花植物',
        careLevel: i.isEven ? '进阶' : '新手友好',
        lightRequirement: '散射光',
        wateringFrequency: '保持土壤湿润',
        description: '典雅的庭院植物，适合温暖湿润环境。',
        imageUrl: 'assets/images/wiki_$i.jpg',
      ));
    }

    _messages.add(AssistantMessage(
      id: 'welcome',
      role: MessageRole.assistant,
      content: '嗨～我是花集智能助手，随时可以问我养护问题。',
      createdAt: now.subtract(const Duration(minutes: 3)),
    ));
  }
}
