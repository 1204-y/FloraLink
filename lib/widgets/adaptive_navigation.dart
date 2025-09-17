import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../theme/app_theme.dart';

class NavigationItem {
  const NavigationItem({
    required this.icon,
    required this.label,
    required this.location,
  });

  final IconData icon;
  final String label;
  final String location;
}

class AdaptiveNavigationScaffold extends StatelessWidget {
  const AdaptiveNavigationScaffold({
    super.key,
    required this.navigationShell,
    required this.destinations,
  });

  final StatefulNavigationShell navigationShell;
  final List<NavigationItem> destinations;

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final bool useRail = constraints.maxWidth >= 900;
        if (useRail) {
          return Row(
            children: <Widget>[
              _NavigationRail(
                navigationShell: navigationShell,
                destinations: destinations,
              ),
              Expanded(
                child: DecoratedBox(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: <Color>[
                        Color(0xFFF6F7F4),
                        Color(0xFFFFFFFF),
                      ],
                    ),
                  ),
                  child: navigationShell,
                ),
              ),
            ],
          );
        }
        return Scaffold(
          body: navigationShell,
          bottomNavigationBar: NavigationBar(
            height: 72,
            labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
            selectedIndex: navigationShell.currentIndex,
            onDestinationSelected: (index) {
              navigationShell.goBranch(index, initialLocation: index == navigationShell.currentIndex);
            },
            destinations: destinations
                .map((item) => NavigationDestination(icon: Icon(item.icon), label: item.label))
                .toList(),
          ),
        );
      },
    );
  }
}

class _NavigationRail extends StatelessWidget {
  const _NavigationRail({
    required this.navigationShell,
    required this.destinations,
  });

  final StatefulNavigationShell navigationShell;
  final List<NavigationItem> destinations;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 280,
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: <Color>[
            Color(0xFFEDF5F0),
            Color(0xFFE4F0E8),
          ],
        ),
        boxShadow: <BoxShadow>[
          BoxShadow(
            color: Colors.black12,
            blurRadius: 12,
            offset: Offset(0, 6),
          ),
        ],
      ),
      child: SafeArea(
        child: Column(
          children: <Widget>[
            const SizedBox(height: 24),
            _LogoHeader(),
            const SizedBox(height: 32),
            Expanded(
              child: ListView.builder(
                itemCount: destinations.length,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                itemBuilder: (context, index) {
                  final destination = destinations[index];
                  final bool selected = navigationShell.currentIndex == index;
                  return _NavigationTile(
                    icon: destination.icon,
                    label: destination.label,
                    selected: selected,
                    onTap: () {
                      navigationShell.goBranch(index, initialLocation: index == navigationShell.currentIndex);
                    },
                  );
                },
              ),
            ),
            const SizedBox(height: 24),
            const _DailyQuote(),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}

class _NavigationTile extends StatelessWidget {
  const _NavigationTile({
    required this.icon,
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final IconData icon;
  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final ColorScheme colorScheme = Theme.of(context).colorScheme;
    return AnimatedContainer(
      duration: const Duration(milliseconds: 220),
      curve: Curves.easeInOut,
      margin: const EdgeInsets.symmetric(vertical: 8),
      decoration: BoxDecoration(
        color: selected ? Colors.white : Colors.transparent,
        borderRadius: BorderRadius.circular(18),
        boxShadow: selected
            ? <BoxShadow>[
                BoxShadow(
                  color: colorScheme.primary.withOpacity(0.15),
                  offset: const Offset(0, 8),
                  blurRadius: 16,
                ),
              ]
            : null,
      ),
      child: ListTile(
        onTap: onTap,
        leading: Icon(icon, color: selected ? colorScheme.primary : colorScheme.primary.withOpacity(0.6)),
        title: Text(
          label,
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                color: selected ? colorScheme.primary : const Color(0xFF4F5B4A),
              ),
        ),
        trailing: selected
            ? Container(
                width: 6,
                height: 36,
                decoration: BoxDecoration(
                  color: AppTheme.duskRose.withOpacity(0.9),
                  borderRadius: BorderRadius.circular(20),
                ),
              )
            : null,
      ),
    );
  }
}

class _LogoHeader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final TextTheme textTheme = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            padding: const EdgeInsets.all(14),
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: <Color>[
                  Color(0xFF7BC69D),
                  Color(0xFF3C9C7A),
                ],
              ),
            ),
            child: const Icon(Icons.spa_rounded, color: Colors.white, size: 28),
          ),
          const SizedBox(height: 18),
          Text('花集 FloraLink', style: textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700)),
          const SizedBox(height: 6),
          Text('让花友与自然的故事延伸到生活每个角落。', style: textTheme.bodyMedium?.copyWith(color: const Color(0xFF708070))),
        ],
      ),
    );
  }
}

class _DailyQuote extends StatelessWidget {
  const _DailyQuote();

  @override
  Widget build(BuildContext context) {
    final TextTheme textTheme = Theme.of(context).textTheme;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(18),
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: <Color>[
              Color(0xFFF6ECF1),
              Color(0xFFE8F6EC),
            ],
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text('今日花语', style: textTheme.titleMedium?.copyWith(color: AppTheme.duskRose)),
            const SizedBox(height: 6),
            Text('「春水初生，春林初盛。」愿你与植物一同茁壮成长。',
                style: textTheme.bodyMedium?.copyWith(color: const Color(0xFF4F5B4A))),
          ],
        ),
      ),
    );
  }
}
