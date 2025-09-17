import 'dart:async';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/models.dart';
import '../../services/mock_repository.dart';

class AssistantPage extends StatefulWidget {
  const AssistantPage({super.key});

  @override
  State<AssistantPage> createState() => _AssistantPageState();
}

class _AssistantPageState extends State<AssistantPage> {
  final TextEditingController _controller = TextEditingController();
  bool _isSending = false;

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final repository = context.watch<MockRepository>();
    final messages = repository.messages;

    return SafeArea(
      child: Column(
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.fromLTRB(24, 24, 24, 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text('智能助手', style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                Text('向花集 AI 询问养护建议、病害诊断或花期灵感。',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: Colors.black54)),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final message = messages[index];
                final bool isUser = message.role == MessageRole.user;
                return Align(
                  alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    constraints: const BoxConstraints(maxWidth: 320),
                    margin: const EdgeInsets.symmetric(vertical: 8),
                    padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                    decoration: BoxDecoration(
                      color: isUser ? const Color(0xFF6FB597) : Colors.white,
                      borderRadius: BorderRadius.circular(20).copyWith(
                        bottomRight: Radius.circular(isUser ? 4 : 20),
                        bottomLeft: Radius.circular(isUser ? 20 : 4),
                      ),
                      boxShadow: <BoxShadow>[
                        BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 16, offset: const Offset(0, 10)),
                      ],
                    ),
                    child: Text(
                      message.content,
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                            color: isUser ? Colors.white : Colors.black87,
                          ),
                    ),
                  ),
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
            child: Row(
              children: <Widget>[
                Expanded(
                  child: TextField(
                    controller: _controller,
                    minLines: 1,
                    maxLines: 3,
                    decoration: InputDecoration(
                      hintText: '输入你的植物问题，例如「绣球叶子发黄怎么办？」',
                      filled: true,
                      fillColor: Colors.white,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 14),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                ElevatedButton.icon(
                  onPressed: _isSending ? null : () => _sendMessage(context),
                  icon: _isSending
                      ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : const Icon(Icons.send_rounded),
                  label: const Text('发送'),
                  style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _sendMessage(BuildContext context) async {
    final repository = context.read<MockRepository>();
    final question = _controller.text.trim();
    if (question.isEmpty) {
      return;
    }
    setState(() {
      _isSending = true;
    });
    repository.addUserQuestion(question);
    _controller.clear();

    await Future<void>.delayed(const Duration(milliseconds: 600));
    repository.addAssistantMessage(AssistantMessage(
      id: 'assistant-${DateTime.now().millisecondsSinceEpoch}',
      role: MessageRole.assistant,
      content: _buildAssistantReply(question),
      createdAt: DateTime.now(),
    ));
    if (mounted) {
      setState(() {
        _isSending = false;
      });
    }
  }

  String _buildAssistantReply(String question) {
    final lower = question.toLowerCase();
    if (lower.contains('浇水')) {
      return '针对浇水问题，建议保持「见干见湿」：先用手指感受土壤 2cm 深度的湿度，干燥再浇；浇水时沿盆壁缓慢注入至盆底微微渗出即可。';
    }
    if (lower.contains('发黄')) {
      return '叶片发黄常见原因有光照不足或积水。可将植株移至散射光环境，修剪黄叶，并检查根系是否积水。';
    }
    if (lower.contains('施肥')) {
      return '施肥时可选择缓释有机肥，薄肥勤施。花期前使用高磷钾肥有助于促花，注意避开正午高温。';
    }
    return '收到～我会结合植物百科与社区经验来解答：保持良好通风、按需浇水，若有照片也欢迎上传到社区寻求更多花友建议。';
  }
}
