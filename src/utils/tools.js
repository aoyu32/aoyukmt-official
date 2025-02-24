import { createAvatar } from '@dicebear/core';
import {
    lorelei,
    pixelArt,
    bottts,
    adventurer,
    funEmoji,
} from '@dicebear/collection';
export default class tools {

    //获取当前日期
    //form:日期格式
    static getFormatDate(form) {
        const date = new Date()
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()


        // 处理格式，优先替换小时（hh）和秒（ss），然后替换月份（mm）和分钟（mm）
        return form
            .replace('yyyy', year) // 获取四位年份
            .replace('yy', String(year).slice(2)) // 获取后两位年份
            .replace('mm', month) // 月份
            .replace('dd', day)// 日期
            .replace('HH', hours) // 小时
            .replace('MM', minutes) // 分钟
            .replace('SS', seconds) // 秒
    }

    //获取随机唯一id
    //type:纯数字 or 数字加字母
    static getRandomId(type = 'num') {
        if (type !== 'num' && type !== 'numStr') {
            throw new Error('type参数只能是 "num" 或 "numStr"');
        }

        if (type === 'num') {
            // 获取当前时间戳
            const timestamp = Date.now();

            // 生成6位随机数
            const randomNum = Math.floor(Math.random() * 1000000)
                .toString()
                .padStart(6, '0');

            // 获取当前时间的毫秒数(3位)
            const milliseconds = new Date().getMilliseconds()
                .toString()
                .padStart(3, '0');

            // 组合ID (时间戳10位 + 毫秒3位 + 随机数3位)
            let id = `${timestamp}${milliseconds}${randomNum.slice(0, 3)}`;

            // 确保总长度为16位
            if (id.length > 16) {
                id = id.slice(0, 16);
            } else if (id.length < 16) {
                id = id.padEnd(16, '0');
            }

            return id;
        } else {
            // 可用的字符集
            const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

            // 获取时间戳并转换为36进制
            const timestamp = Date.now().toString(36).toUpperCase();

            // 生成随机字符
            let randomChars = '';
            for (let i = 0; i < 8; i++) {
                randomChars += chars[Math.floor(Math.random() * chars.length)];
            }

            // 组合ID (时间戳 + 随机字符)
            let id = `${timestamp}${randomChars}`;

            // 确保总长度为16位
            if (id.length > 16) {
                id = id.slice(0, 16);
            } else if (id.length < 16) {
                id = id.padEnd(16, chars[Math.floor(Math.random() * chars.length)]);
            }

            return id;
        }
    }


    //随机生成一个带前缀的的名称,字母加数字,加前缀共12个字符
    static getRandomName(prefix = 'akm-') {
        const randomLength = 12 - prefix.length
        //生成随机字符串
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let randomName = ''
        for (let i = 0; i < randomLength; i++) {
            randomName += chars[Math.floor(Math.random() * chars.length)]
        }

        return prefix + randomName
    }

    //生成随机头像
    static getRandomAvatar() {
        // 随机背景色数组
        const backgroundColors = [
            'FFB6C1', 'FFE4E1', 'E6E6FA', 'F0FFF0', 'F0F8FF',  // 浅色系
            '87CEEB', '98FB98', 'DDA0DD', 'F0E68C', 'E0FFFF',  // 中色系
            'FFA07A', '7FFFD4', 'FFDAB9', 'D8BFD8', 'B0E0E6'   // 暖色系
        ];

        // 可用的头像风格
        const styles = [
            {
                style: pixelArt,
                options: {
                    pixels: [10, 12, 14, 16],
                    colorful: true
                }
            },
            {
                style: lorelei,
                options: {
                    hair: ['shortHair', 'longHair', 'bald', 'curlyHair'],
                    accessories: ['glasses', 'headphones', 'hat'],
                    eyes: ['happy', 'wink', 'normal', 'squint'],
                    mouth: ['smile', 'laugh', 'normal']
                }
            },
            {
                style: bottts,
                options: {
                    colorful: true,
                    primaryColorLevel: [50, 100, 200, 300, 400]
                }
            },
            {
                style: adventurer,
                options: {
                    hair: ['short', 'long', 'bun', 'curly'],
                    eyes: ['normal', 'happy', 'squint'],
                    features: ['freckles', 'glasses']
                }
            },
            {
                style: funEmoji,
                options: {}
            }
        ];

        // 随机选择一个风格
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];

        // 随机选择一个背景色
        const randomBgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];

        // 创建头像
        const avatar = createAvatar(randomStyle.style, {
            seed: Math.random().toString(36).substring(2, 10),
            backgroundColor: [randomBgColor],
            radius: 50,
            size: 256,
            scale: 100,
            options: randomStyle.options
        });

        return avatar.toDataUri();
    }

}
