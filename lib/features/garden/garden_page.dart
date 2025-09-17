import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../../models/models.dart';
import '../../services/mock_repository.dart';
import '../../widgets/info_chip.dart';
import '../../widgets/section_header.dart';

class GardenPage extends StatelessWidget {
  const GardenPage({super.key});

  @override
  Widget build(BuildContext context) {
    final repository = context.watch<MockRepository>();
    final plants = repository.plants;

    return SafeArea(
      child: CustomScrollView(
        slivers: <Widget>[
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
            sliver: SliverList(
              delegate: SliverChildListDelegate(<Widget>[
                const SectionHeader(
                  title: '我的花园',
                  subtitle: '记录每一次细心呵护，让植物的故事延续',
                ),
                const SizedBox(height: 24),
                Wrap(
                  spacing: 20,
                  runSpacing: 20,
                  children: plants.map((plant) => _PlantCard(plant: plant)).toList(),
                ),
              ]),
            ),
          ),
        ],
      ),
    );
  }
}

class _PlantCard extends StatelessWidget {
  const _PlantCard({required this.plant});

  final Plant plant;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final dateFormat = DateFormat('M月d日');
    return Container(
      width: 320,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: <Color>[
            Color(0xFFF5FBF7),
            Color(0xFFFDF6F8),
          ],
        ),
        boxShadow: <BoxShadow>[
          BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 24, offset: const Offset(0, 12)),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              height: 160,
              width: double.infinity,
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: <Color>[
                    const Color(0xFF6FB597).withOpacity(0.8),
                    const Color(0xFFF7D9E1).withOpacity(0.8),
                  ],
                ),
              ),
              child: Stack(
                children: <Widget>[
                  Positioned(
                    top: 24,
                    left: 24,
                    right: 24,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(plant.name, style: textTheme.titleLarge?.copyWith(color: Colors.white, fontWeight: FontWeight.w700)),
                        const SizedBox(height: 6),
                        Text(plant.species, style: textTheme.bodyMedium?.copyWith(color: Colors.white70)),
                      ],
                    ),
                  ),
                  Positioned(
                    bottom: -18,
                    right: 16,
                    child: Container(
                      width: 120,
                      height: 120,
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.15),
                        shape: BoxShape.circle,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      InfoChip(
                        label: plant.healthStatus.label,
                        icon: plant.healthStatus.icon,
                        color: plant.healthStatus.color,
                      ),
                      const SizedBox(width: 12),
                      InfoChip(label: plant.location, icon: Icons.home_rounded, color: const Color(0xFF6FB597)),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Text('上次浇水：${dateFormat.format(plant.lastWateredAt)}',
                      style: textTheme.bodyMedium?.copyWith(color: Colors.black54)),
                  const SizedBox(height: 14),
                  Text('成长记录', style: textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w600)),
                  const SizedBox(height: 8),
                  ...plant.timeline.take(3).map((record) {
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 6),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Container(
                            width: 8,
                            height: 8,
                            margin: const EdgeInsets.only(top: 6, right: 12),
                            decoration: BoxDecoration(
                              color: const Color(0xFF6FB597),
                              borderRadius: BorderRadius.circular(4),
                            ),
                          ),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                Text(dateFormat.format(record.date),
                                    style: textTheme.bodySmall?.copyWith(color: Colors.black45)),
                                const SizedBox(height: 4),
                                Text(record.note, style: textTheme.bodyMedium?.copyWith(color: Colors.black87)),
                              ],
                            ),
                          ),
                        ],
                      ),
                    );
                  }),
                  if (plant.timeline.length > 3)
                    Padding(
                      padding: const EdgeInsets.only(top: 8, bottom: 20),
                      child: Text('查看更多记录...', style: textTheme.bodySmall?.copyWith(color: Colors.black45)),
                    )
                  else
                    const SizedBox(height: 20),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
