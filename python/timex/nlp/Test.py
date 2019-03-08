#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2017/11/22 10:21
# @Author  : zhm
# @File    : Test.py
# @Software: PyCharm
import sys
import re
import os
from TimeNormalizer import TimeNormalizer

reload(sys)
sys.setdefaultencoding('utf-8')

# raw = u'''
# 2019年全国大学生节能减排社会实践与科技竞赛（校内1号通知）大学生节能减排社会实践与科技竞赛是“节能减排学校行动”的主要内容之一。为贯彻落实《教育部关于开展节能减排学校行动的通知》（教发[2007]19号）精神，教育部高等教育司主办并委托教育部高等学校能源动力学科教学指导委员会举办“全国大学生节能减排社会实践和科技竞赛”。自2008年起，通过前十届的成功举办，该活动已经成为全国高校能源动力领域最有影响的学生赛事和课外实践活动之一。2019年全国大学生节能减排社会实践与科技竞赛将会在唐山举行，现发布通知如下。一、竞赛主题节能减排，绿色能源。二、竞赛内容紧扣竞赛主题，作品包括实物制作（含模型）、软件、设计和社会实践调研报告等，体现新思想、新原理、新方法及新技术。三、竞赛规则1、参赛对象：全日制非成人教育的专科生、本科生、硕士研究生和博士研究生（含港澳台，不含在职研究生）。参赛者必须以小组形式参赛，每组不得超过7人，可聘请指导教师1名。2、参赛单位：以高等学校为参赛单位，每所高校限报15项作品，申报作品时需对所有作品进行排序以作评审参考。3、作品申报：参赛作品必须是比赛当年完成的作品。参赛学生必须在规定时间内完成设计，并按要求准时上交参赛作品，未按时上交者作自动放弃处理。申报书、说明书和汇总表等模板请在大赛官方网站公告栏自行下载，官方网址：www.jienengjianpai.org。4、校内评审：根据作品的科学性、创新性、可行性和经济性等对作品进行校内选拔，暂定4月下旬，具体时间另行通知。四、竞赛日程与安排1、竞赛报名：请于2019年3月25日前将电子版报名表（见附件），发送到邮箱：hvac_shanghai@163.com。（报名组数超过15组，将进行校内选拔，具体时间另行通知）2、作品申报：（1）电子版。被选拔竞赛作品申报书于2019年5月20日18：00前进行网上提交（未按时在网上提交者视为自动放弃）。大赛组委会将为每所参赛高校分配一个账号，用于注册和上传作品。届时由各高校网上提交本校参赛学生作品，为避免集中上传作品造成网络堵塞，请尽早在网上提交竞赛作品。（2）纸质版。请以学校为单位，将所有参赛作品的纸质版（一式5份）盖好院章（校章地方统一盖），于2019年5月20日前，嘉定校区提交到机械大楼A214，本部校区提交到济阳楼413室。对于纸质版材料，科技作品设计说明书请附在科技作品类申报书后面一并装订，社会实践调查报告请附在社会实践类申报书后面一并装订，由学校统一邮寄到竞赛组委会。3、全国作品终审、决赛具体时间等官网具体通知。    五、全国赛事奖励1、竞赛设立等级奖、单项奖和优秀组织奖三类奖项。2、等级奖设特等奖（可空缺）、一等奖、二等奖、三等奖。各等级的获奖比例由竞赛委员会根据参赛规模的实际情况确定。3、单项奖由专家委员会提出设立，报竞赛委员会批准。4、优秀组织奖由组织委员会对竞赛组织中表现突出的单位进行提名，报竞赛委员会讨论通过确定。    六、联系方式李翠，18930290532    报名邮箱：hvac_shanghai@163.com                                               
#                                                
# 同济大学本科生院机械与能源工程学院2019年2月26日'''

# # raw = u'2019年全国大学生节能减排社会实践与科技竞赛（校内1号通知）大学生节能减排社会实践与科技竞赛是“节能减排学校行动”的主要内容之一。为贯彻落实《教育部关于开展节能减排学校行动的通知》（教发[2007]19号）精神，教育部高等教育司主办并委托教育部高等学校能源动力学科教学指导委员会举办“全国大学生节能减排社会实践和科技竞赛”。自2008年起，通过前十届的成功举办，该活动已经成为全国高校能源动力领域最有影响的学生赛事和课外实践活动之一。'

# # para =cut_sent(raw)
# # print(para)

# # sents = para.split("\n")

# tn = TimeNormalizer(isPreferFuture=True)
# tn.parse(raw)
# for token in tn.timeToken:
# #     # print(token)
#   print token.time.format("YYYY-MM-DD HH:mm:ss --- ") + re.sub(u'\d[\.、]','',token.sent)

#   # print "\n\n\n"

tn = TimeNormalizer(isPreferFuture=True)

path = '/Users/simon/Desktop/TiCalendar/python/res'
files = os.listdir(path)
for file in files:
    if file == '.DS_Store':
        continue
    with open(path + '/' + file, "rb") as fin:
        text = fin.read().decode('utf-8')
        if text:
            tn.parse(text)
            with open(path + '/' + "res_" + file, "w") as fout:
                for token in tn.timeToken:
                    fout.write(token.time.format("YYYY-MM-DD HH:mm:ss --- "))
                    event = re.sub(u'\d[\.、]','',token.sent).replace('\n','')
                    if len(event) > 150:
                        fout.write(event[:150])
                    else:
                        fout.write(event)
                    fout.write('\n')
