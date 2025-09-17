"""Conversational assistant endpoints used by the frontend."""
from __future__ import annotations

from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..deps import get_current_user
from ..models import AssistantMessage, User
from ..schemas import AssistantMessageRead, AssistantPrompt, AssistantResponse

router = APIRouter(prefix="/assistant", tags=["assistant"])


_KEYWORD_RESPONSES = {
    "黄叶": "叶片发黄通常与浇水过量或缺乏光照有关，建议先检查盆土湿度，保持见干见湿，同时增加通风与散射光。",
    "浇水": "浇水时可遵循“少量多次”的原则，确保土壤湿润但不积水，清晨或傍晚是较合适的时间。",
    "修剪": "修剪时可优先剪除病叶、枯枝与徒长枝，保持良好株型并促进新芽萌发。",
    "病虫": "发现病虫害后，可先进行物理隔离，针对性使用低毒环保药剂，并记录发生时间以便后续追踪。",
}

_DEFAULT_SUGGESTIONS = [
    "记录一次成长照片，方便 AI 追踪养护效果",
    "查看社区热门话题，向经验花友取经",
    "将养护任务同步到日历，保持节奏",
]


def _generate_answer(question: str, context: str | None) -> tuple[str, List[str]]:
    lowered = question.lower()
    matched = []
    for keyword, answer in _KEYWORD_RESPONSES.items():
        if keyword in question:
            matched.append(answer)
    if not matched:
        matched.append(
            "我已经记录下你的问题，可以先观察叶片、土壤与光照状况，并结合养护手册逐项排查。"
        )
    if context:
        matched.append(f"结合你提供的环境信息：{context}，建议先从环境调节入手。")
    suggestions = list(_DEFAULT_SUGGESTIONS)
    if "浇水" in lowered:
        suggestions.insert(0, "使用浇水提醒功能，按照频率进行维护")
    if "施肥" in lowered:
        suggestions.insert(0, "参考百科中对应植物的施肥时间表")
    return "\n".join(matched), suggestions[:5]


@router.get("", response_model=List[AssistantMessageRead])
def list_messages(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
) -> List[AssistantMessage]:
    """Return the latest assistant messages for the authenticated user."""

    return (
        db.query(AssistantMessage)
        .filter(AssistantMessage.user_id == current_user.id)
        .order_by(AssistantMessage.created_at.desc())
        .limit(20)
        .all()
    )


@router.post("", response_model=AssistantResponse, status_code=status.HTTP_201_CREATED)
def create_message(
    prompt: AssistantPrompt,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> AssistantResponse:
    """Store a question and return a generated assistant reply."""

    answer, suggestions = _generate_answer(prompt.question, prompt.context)
    message = AssistantMessage(user_id=current_user.id, question=prompt.question, answer=answer)
    db.add(message)
    db.commit()
    db.refresh(message)
    return AssistantResponse(message=message, suggestions=suggestions)
