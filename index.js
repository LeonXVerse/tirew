if (interaction.customId == `takribi_${interaction.user.id}`) {

      let gdata = await game.findOne({
        id: interaction.user.id
      })

      if (!gdata) return;
      if (!gdata.coins || gdata.coins == null) return;
      if (!gdata.with || gdata.with == null) return;
      if (!gdata.msgID || gdata.msgID == null) return;
      gdata.game = "takribi"
      await gdata.save()
      await interaction.deferReply({ ephemeral: true })
      let usraccano = interaction.guild.members.cache.find(s => s.id == gdata.with)
      if (!usraccano) return interaction.reply({ content: `\`❎\` **لم استطيع إجاد صديقك في الخادم**`, ephemeral: true })
      gdata.time = timestamp(moment(ms("40s")) + Date.now())
      await gdata.save()
      let embed_edit = new Discord.MessageEmbed()
        .setColor("#FFC32D")
        .setDescription(`> تنبيه: في حال عدم استجابة الطرفين و عدم اكمال التحدي يؤدي الى خصم نصف المبلغ من الطرفين.
  > عند التعادل لا يتم سحب اي مبلغ من الطرفين.`)
        .addFields({ name: `📊 لعبة الرقم التقريبي:`, value: `> في كل جولة سوف تحصل على رقم عشوائي, و انت عليك ان تحصل على نفس الرقم او اقل منه, الذي يحصل عليه يفوز, في حال الحصول على اعلى تعتبر خاسر, جولة واحدة لكل تحدي ! انهاء الجولة يعني انهاء التحدي, التعادل ليس فوزا !` }, { name: `المبلغ:`, value: `${parseInt(gdata.coins)}` })


      let button_yes = new MessageButton()
        .setCustomId(`yestkg_${gdata.msgID}`)
        .setLabel("قبول")
        .setStyle("SUCCESS")

      let button_no = new MessageButton()
        .setCustomId(`notkg_${gdata.msgID}`)
        .setLabel("رفض")
        .setStyle("DANGER")

      let row = new MessageActionRow()
        .setComponents(button_yes, button_no)

      interaction.editReply({ content: `> لقد تم اختيار العبة هي : \`الرقم التقريبي\` !!`, ephemeral: true })
      client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit], content: `> بانتظار رد من ${usraccano} ...`, components: [row] })).catch(err => console.error(err))
    }
    if (interaction.customId == `yestkg_${interaction.message.id}`) {
      let gdatawith = await game.findOne({
        with: interaction.user.id
      })
      if (!gdatawith) return;
      if (interaction.message.id !== gdatawith.msgID) return;
      await interaction.deferReply({ ephemeral: true })
      let stusrgame = client.users.cache.get(gdatawith.id)
      let wthusrgame = client.users.cache.get(gdatawith.with)
      let nums = ["1", "2"]
      let numr = nums[Math.floor(Math.random() * nums.length)]
      let usrchoose = "";
      let notrole = "";
      if (numr == "1") {
        usrchoose = gdatawith.id;
        notrole = gdatawith.with;
        statusuingame1 = "**Playing..**";
        statusuingame2 = "Waiting.."
      }
      if (numr == "2") {
        usrchoose = gdatawith.with;
        notrole = gdatawith.id;
        statusuingame1 = "Waiting..";
        statusuingame2 = "**Playing..**"
      }
      gdatawith.time = timestamp(moment(ms("90s")) + Date.now())
      await gdatawith.save()
      interaction.editReply({ content: `> لقد تم القبول اللعبة هي : \`الرقم التقريبي\` ، اللعب مع : ${stusrgame} !!`, ephemeral: true })
      const firstNumbers = [];
      for (let i = 19; i <= 79; i += 3) {
        firstNumbers.push(i);
      }

      const secondNumbers = [2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7];
      const thirdNumbers = [4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14];
      const fourthNumbers = [5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 12, 12, 13, 14, 15, 15, 16, 16, 17, 18, 18, 19];
      const fiveNumbers = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 22, 23, 24, 25, 26, 27];


      const randomIndex = Math.floor(Math.random() * firstNumbers.length);
      const a = secondNumbers[randomIndex];
      const b = thirdNumbers[randomIndex];
      const c = fourthNumbers[randomIndex];
      const d = fiveNumbers[randomIndex]
      const numaksa = firstNumbers[randomIndex];
      setTimeout(async () => {
        let embed_edit_nrd_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${numaksa}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> ${statusuingame1}` }, { name: `${wthusrgame.tag}`, value: `> ${statusuingame2}` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdatawith.msgID}`)
          .setLabel(`${a} - ${b}`)
          .setStyle("PRIMARY")
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdatawith.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdatawith.msgID}`)
          .setLabel(`${c} - ${d}`)
          .setStyle("PRIMARY")
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdatawith.msgID).then(msg1 => msg1.edit({ embeds: [embed_edit_nrd_game], content: `<@!${usrchoose}>\n انه دورك`, components: [row] })).catch(err => console.error(err))
      }, 1250)



      let tkdata = await takribi.findOne({
        msgID: gdatawith.msgID
      })
      if (!tkdata) {


        tkdata = await takribi.create({
          msgID: gdatawith.msgID,
          idstusr: gdatawith.id,
          role: usrchoose,
          notrole: notrole,
          max_number: numaksa,
          number_players_done: 0,
          number_smaller1: a,
          number_smaller2: b,
          number_greater1: c,
          number_greater2: d
        })


      } else {


        tkdata = await takribi.findOneAndUpdate({
          msgID: gdatawith.msgID,
          idstusr: gdatawith.id,
          role: usrchoose,
          notrole: notrole,
          max_number: numaksa,
          number_players_done: 0,
          number_smaller1: a,
          number_smaller2: b,
          number_greater1: c,
          number_greater2: d
        })


      }






      let tkusrdata = await tkusr.findOne({
        id: gdatawith.id
      })

      if (!tkusrdata) {

        tkusrdata = await tkusr.create({
          id: gdatawith.id,
          with: gdatawith.with,
          attempt: 0,
          numbers: [],
          result: 0,
          msgID: interaction.message.id
        })


      } else {


        tkusrdata = await tkusr.findOneAndUpdate({
          id: gdatawith.id,
          with: gdatawith.with,
          attempt: 0,
          numbers: [],
          result: 0,
          msgID: interaction.message.id
        })


      }



      let tkusr1data = await tkusr.findOne({
        id: gdatawith.with
      })
      if (!tkusr1data) {
        tkusr1data = await tkusr.create({
          id: gdatawith.with,
          with: gdatawith.id,
          attempt: 0,
          numbers: [],
          result: 0,
          msgID: interaction.message.id
        })


      } else {


        tkusr1data = await tkusr.findOneAndUpdate({
          id: gdatawith.with,
          with: gdatawith.id,
          attempt: 0,
          numbers: [],
          result: 0,
          msgID: interaction.message.id
        })


      }
      return;
    }
    if (interaction.customId == `notkg_${interaction.message.id}`) {
      let gdata = await game.findOne({
        msgID: interaction.message.id
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(gdata.id)
      let wthusrgame = client.users.cache.get(gdata.with)
      if (stusrgame.id !== interaction.user.id && wthusrgame.id !== interaction.user.id) return;
      if (stusrgame.id == interaction.user.id) {
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
          embeds: [], content: `>  تم إلغاء التحدي بنجاح ${interaction.user} ! 
          > || ${stusrgame} | ${wthusrgame} || `, components: []
        })).catch(err => console.error(err))
      }
      if (wthusrgame.id == interaction.user.id) {
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({
          embeds: [], content: `>  تم رفض التحدي بنجاح ${interaction.user} ! 
        > || ${stusrgame} | ${wthusrgame} || `, components: []
        })).catch(err => console.error(err))
      }
      await game.findOneAndDelete({
        id: stusrgame.id,
        with: wthusrgame.id,
        msgID: interaction.message.id
      })
      let data = await db.findOne({
        id: stusrgame.id
      })
      if (!data) {
        data = await db.create({
          id: stusrgame.id,
          coins: 0,
          status_playing: "no"
        })
      }
      let data2 = await db.findOne({
        id: wthusrgame.id
      })
      if (!data2) {
        data2 = await db.create({
          id: wthusrgame.id,
          coins: 0,
          status_playing: "no"
        })
      }
      data2.status_playing = "no";
      await data2.save()
      data.status_playing = "no";
      await data.save()
    }
    if (interaction.customId == `finishtk_${interaction.message.id}`) {
      let data = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!data) return;
      let datausr = await tkusr.findOne({
        id: interaction.user.id,
        msgID: interaction.message.id
      })
      if (!datausr) return;
      await interaction.deferReply({ ephemeral: true })
      if (data.role !== interaction.user.id && data.notrole == interaction.user.id) return interaction.editReply({ content: `انه ليس دورك !`, ephemeral: true })
      if (data.role !== interaction.user.id) return;
      let gdata = await game.findOne({
        id: data.idstusr,
        msgID: interaction.message.id
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(data.idstusr)
      if (!stusrgame) return;
      let wthusrgame = client.users.cache.get(gdata.with)
      if (!wthusrgame) return;
      data.number_players_done = parseInt(data.number_players_done) + 1;
      await data.save()
      let dataup = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!dataup) return;
      gdata.time = timestamp(moment(ms("90s")) + Date.now())
      await gdata.save()
      if (parseInt(dataup.number_players_done) == 1) {
        if (data.notrole == stusrgame.id) {
          data.role = stusrgame.id;
          await data.save()
          data.notrole = wthusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          interaction.editReply({ content: `> تم الأنتهاء من اللعب ، انتظر صديقك حتى يلعب !`, ephemeral: true })
          return;
        }
        if (data.notrole == wthusrgame.id) {
          data.role = wthusrgame.id;
          await data.save()
          data.notrole = stusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          interaction.editReply({ content: `> تم الأنتهاء من اللعب ، انتظر صديقك حتى يلعب !`, ephemeral: true })
          return;
        }
      }
      let datausrtk1 = await tkusr.findOne({
        id: stusrgame.id,
        with: wthusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk1) return;
      let datausrtk2 = await tkusr.findOne({
        id: wthusrgame.id,
        with: stusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk2) return;
      if (parseInt(dataup.number_players_done) == 2) {
        let embed_finish_tk_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${dataup.max_number}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdata.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
          .setDisabled()
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
        setTimeout(async () => {
          if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
        }, 1500)
        return;
      }
    }



    if (interaction.customId == `arkam1tk_${interaction.message.id}`) {
      let data = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!data) return;
      let datausr = await tkusr.findOne({
        id: interaction.user.id,
        msgID: interaction.message.id
      })
      if (!datausr) return;
      await interaction.deferReply({ ephemeral: true })
      if (data.role !== interaction.user.id && data.notrole == interaction.user.id) return interaction.editReply({ content: `انه ليس دورك !`, ephemeral: true })
      if (data.role !== interaction.user.id) return;
      let gdata = await game.findOne({
        id: data.idstusr,
        msgID: interaction.message.id
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(data.idstusr)
      if (!stusrgame) return;
      let wthusrgame = client.users.cache.get(gdata.with)
      if (!wthusrgame) return;
      let dataup = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!dataup) return;
      gdata.time = timestamp(moment(ms("90s")) + Date.now())
      await gdata.save()
      let urnum = getRandomNumber(parseInt(data.number_smaller1), parseInt(data.number_smaller2))
      datausr.numbers.push(urnum)
      await datausr.save()
      datausr.result = parseInt(datausr.result) + urnum;
      await datausr.save()
      let datausrup = await tkusr.findOne({
        id: interaction.user.id,
        msgID: interaction.message.id
      })
      if (!datausrup) return;
      let datausrtk1 = await tkusr.findOne({
        id: stusrgame.id,
        with: wthusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk1) return;
      let datausrtk2 = await tkusr.findOne({
        id: wthusrgame.id,
        with: stusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk2) return;
      if ((parseInt(data.max_number) < parseInt(datausrup.result))) {
        data.number_players_done = parseInt(data.number_players_done) + 1
        await data.save()
        datausrup = await tkusr.findOne({
          id: interaction.user.id,
          msgID: interaction.message.id
        })
        datausrtk1 = await tkusr.findOne({
          id: stusrgame.id,
          with: wthusrgame.id,
          msgID: interaction.message.id
        })
        datausrtk2 = await tkusr.findOne({
          id: wthusrgame.id,
          with: stusrgame.id,
          msgID: interaction.message.id
        })
        dataup = await takribi.findOne({
          msgID: interaction.message.id
        })
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
        }

        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          return;
        }





        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${wthusrgame}  فائززززز !!! ب مجموع ${datausrtk2.result} نقطة!\n\n${stusrgame} خاسر ب مجموع **${datausrtk1.result}** نقطة!\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
          return;
        }
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
                  اصبح مجموعك ${datausrup.result}
                  > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
        }
      }
      if ((parseInt(data.max_number) == parseInt(datausrup.result))) {
        data.number_players_done = parseInt(data.number_players_done) + 1
        await data.save()
        datausrup = await tkusr.findOne({
          id: interaction.user.id,
          msgID: interaction.message.id
        })
        datausrtk1 = await tkusr.findOne({
          id: stusrgame.id,
          with: wthusrgame.id,
          msgID: interaction.message.id
        })
        datausrtk2 = await tkusr.findOne({
          id: wthusrgame.id,
          with: stusrgame.id,
          msgID: interaction.message.id
        })
        dataup = await takribi.findOne({
          msgID: interaction.message.id
        })
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
        }

        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          return;
        }





        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
            اصبح مجموعك ${datausrup.result}
            > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
          return;
        }
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
        }
      }
      if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
        if (data.notrole == stusrgame.id) {
          data.role = stusrgame.id;
          await data.save()
          data.notrole = wthusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        if (data.notrole == wthusrgame.id) {
          data.role = wthusrgame.id;
          await data.save()
          data.notrole = stusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
      }

      if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
        if (data.notrole == stusrgame.id) {
          data.role = stusrgame.id;
          await data.save()
          data.notrole = wthusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        if (data.notrole == wthusrgame.id) {
          data.role = wthusrgame.id;
          await data.save()
          data.notrole = stusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        return;
      }





      if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
        interaction.editReply({
          content: `لقد حصلت على **${urnum}**
اصبح مجموعك ${datausrup.result}
> يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
        })
        let embed_finish_tk_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${dataup.max_number}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdata.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
          .setDisabled()
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
        setTimeout(async () => {
          if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
        }, 1500)
        return;
      }
      if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
        interaction.editReply({
          content: `لقد حصلت على **${urnum}**
        اصبح مجموعك ${datausrup.result}
        > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
        })
        let embed_finish_tk_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${dataup.max_number}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdata.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
          .setDisabled()
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
        setTimeout(async () => {
          if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
        }, 1500)
        return;
      }
      return interaction.editReply({
        content: `لقد حصلت على **${urnum}**
       اصبح مجموعك ${datausrup.result}
       ||تنبيه: انتبه ان يصبح مجموعك اعلى من الرقم المطلوب, يمكنك انهاء دورك بالضغط على الزر الاخضر||`, ephemeral: true
      })
    }



















    if (interaction.customId == `arkam2tk_${interaction.message.id}`) {
      let data = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!data) return;
      let datausr = await tkusr.findOne({
        id: interaction.user.id,
        msgID: interaction.message.id
      })
      if (!datausr) return;
      await interaction.deferReply({ ephemeral: true })
      if (data.role !== interaction.user.id && data.notrole == interaction.user.id) return interaction.editReply({ content: `انه ليس دورك !`, ephemeral: true })
      if (data.role !== interaction.user.id) return;
      let gdata = await game.findOne({
        id: data.idstusr,
        msgID: interaction.message.id
      })
      if (!gdata) return;
      let stusrgame = client.users.cache.get(data.idstusr)
      if (!stusrgame) return;
      let wthusrgame = client.users.cache.get(gdata.with)
      if (!wthusrgame) return;
      data.number_players_done = parseInt(data.number_players_done) + 1;
      let dataup = await takribi.findOne({
        msgID: interaction.message.id
      })
      if (!dataup) return;
      gdata.time = timestamp(moment(ms("90s")) + Date.now())
      await gdata.save()
      let urnum = getRandomNumber(parseInt(data.number_greater1), parseInt(data.number_greater2))
      datausr.numbers.push(urnum)
      await datausr.save()
      datausr.result = parseInt(datausr.result) + urnum;
      await datausr.save()
      let datausrup = await tkusr.findOne({
        id: interaction.user.id,
        msgID: interaction.message.id
      })
      if (!datausrup) return;
      let datausrtk1 = await tkusr.findOne({
        id: stusrgame.id,
        with: wthusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk1) return;
      let datausrtk2 = await tkusr.findOne({
        id: wthusrgame.id,
        with: stusrgame.id,
        msgID: interaction.message.id
      })
      if (!datausrtk2) return;
      if ((parseInt(data.max_number) < parseInt(datausrup.result))) {
        data.number_players_done = parseInt(data.number_players_done) + 1
        await data.save()
        datausrup = await tkusr.findOne({
          id: interaction.user.id,
          msgID: interaction.message.id
        })
        datausrtk1 = await tkusr.findOne({
          id: stusrgame.id,
          with: wthusrgame.id,
          msgID: interaction.message.id
        })
        datausrtk2 = await tkusr.findOne({
          id: wthusrgame.id,
          with: stusrgame.id,
          msgID: interaction.message.id
        })
        dataup = await takribi.findOne({
          msgID: interaction.message.id
        })
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
        }

        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                      اصبح مجموعك ${datausrup.result}
                      > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          return;
        }





        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
            اصبح مجموعك ${datausrup.result}
            > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
          return;
        }
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
                    اصبح مجموعك ${datausrup.result}
                    > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)
        }
      }
      if ((parseInt(data.max_number) == parseInt(datausrup.result))) {
        data.number_players_done = parseInt(data.number_players_done) + 1
        await data.save()
        datausrup = await tkusr.findOne({
          id: interaction.user.id,
          msgID: interaction.message.id
        })
        datausrtk1 = await tkusr.findOne({
          id: stusrgame.id,
          with: wthusrgame.id,
          msgID: interaction.message.id
        })
        datausrtk2 = await tkusr.findOne({
          id: wthusrgame.id,
          with: stusrgame.id,
          msgID: interaction.message.id
        })
        dataup = await takribi.findOne({
          msgID: interaction.message.id
        })
        if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                        اصبح مجموعك ${datausrup.result}
                        > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                        اصبح مجموعك ${datausrup.result}
                        > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
        }

        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
          if (data.notrole == stusrgame.id) {
            data.role = stusrgame.id;
            await data.save()
            data.notrole = wthusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                        اصبح مجموعك ${datausrup.result}
                        > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          if (data.notrole == wthusrgame.id) {
            data.role = wthusrgame.id;
            await data.save()
            data.notrole = stusrgame.id;
            await data.save()
            let embed_finish_tk_game = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
            let button_arkam1 = new MessageButton()
              .setCustomId(`arkam1tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
              .setStyle("PRIMARY")
            let button_finish = new MessageButton()
              .setCustomId(`finishtk_${gdata.msgID}`)
              .setLabel("finish")
              .setStyle("SUCCESS")
            let button_arkam2 = new MessageButton()
              .setCustomId(`arkam2tk_${gdata.msgID}`)
              .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
              .setStyle("PRIMARY")
            let row = new MessageActionRow()
              .setComponents(button_arkam1, button_finish, button_arkam2)
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
            return interaction.editReply({
              content: `لقد حصلت على **${urnum}**
                        اصبح مجموعك ${datausrup.result}
                        > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
            })
          }
          return;
        }





        if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
          interaction.editReply({
            content: `لقد حصلت على **${urnum}**
              اصبح مجموعك ${datausrup.result}
              > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
            .setDisabled()
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
            .setDisabled()
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
          setTimeout(async () => {
            if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
            if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
              let embed_finish_tk_game_tm = new Discord.MessageEmbed()
                .setTitle("بيانات التحدي")
                .setDescription(`اقصى رقم : **${dataup.max_number}**`)
                .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
              client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
              let datacoinsusr1st = await db.findOne({
                id: stusrgame.id
              })
              if (!datacoinsusr1st) {
                datacoinsusr1st = await db.create({
                  id: stusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
              await datacoinsusr1st.save()
              let datacoinsusr2st = await db.findOne({
                id: wthusrgame.id
              })
              if (!datacoinsusr2st) {
                datacoinsusr = await db.create({
                  id: wthusrgame.id,
                  coins: 0,
                  status_playing: "no"
                })
              }
              let tax = parseInt(gdata.coins) * 0.04;
              let total = parseInt(gdata.coins) - parseInt(tax);
              datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
              await datacoinsusr2st.save()
              datacoinsusr1st.status_playing = "no"
              await datacoinsusr1st.save()
              datacoinsusr2st.status_playing = "no"
              await datacoinsusr2st.save()
              await takribi.findOneAndDelete({
                msgID: gdata.msgID,
                idstusr: stusrgame.id
              })
              await tkusr.findOneAndDelete({
                id: stusrgame.id,
                msgID: interaction.message.id
              })
              await tkusr.findOneAndDelete({
                id: wthusrgame.id,
                msgID: interaction.message.id
              })
              await game.findOneAndDelete({
                id: stusrgame.id,
                with: wthusrgame.id,
                msgID: interaction.message.id
              })
              return;
            }
          }, 1500)

          return;
        }
      }

      if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
        if (data.notrole == stusrgame.id) {
          data.role = stusrgame.id;
          await data.save()
          data.notrole = wthusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        if (data.notrole == wthusrgame.id) {
          data.role = wthusrgame.id;
          await data.save()
          data.notrole = stusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
      }

      if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) == 1) {
        if (data.notrole == stusrgame.id) {
          data.role = stusrgame.id;
          await data.save()
          data.notrole = wthusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> **Playing..**` }, { name: `${wthusrgame.tag}`, value: `> Done` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${stusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        if (data.notrole == wthusrgame.id) {
          data.role = wthusrgame.id;
          await data.save()
          data.notrole = stusrgame.id;
          await data.save()
          let embed_finish_tk_game = new Discord.MessageEmbed()
            .setTitle("بيانات التحدي")
            .setDescription(`اقصى رقم : **${dataup.max_number}**`)
            .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> **Playing..**` })
          let button_arkam1 = new MessageButton()
            .setCustomId(`arkam1tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
            .setStyle("PRIMARY")
          let button_finish = new MessageButton()
            .setCustomId(`finishtk_${gdata.msgID}`)
            .setLabel("finish")
            .setStyle("SUCCESS")
          let button_arkam2 = new MessageButton()
            .setCustomId(`arkam2tk_${gdata.msgID}`)
            .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
            .setStyle("PRIMARY")
          let row = new MessageActionRow()
            .setComponents(button_arkam1, button_finish, button_arkam2)
          client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> ${wthusrgame}\n اصبح دورك !`, components: [row] })).catch(err => console.error(err))
          return interaction.editReply({
            content: `لقد حصلت على **${urnum}**
          اصبح مجموعك ${datausrup.result}
          > يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
          })
        }
        return;
      }





      if ((parseInt(data.max_number) < parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
        interaction.editReply({
          content: `لقد حصلت على **${urnum}**
اصبح مجموعك ${datausrup.result}
> يا للأسف , لقد تخطيت الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
        })
        let embed_finish_tk_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${dataup.max_number}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdata.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
          .setDisabled()
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
        setTimeout(async () => {
          if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
        }, 1500)
        return;
      }
      if ((parseInt(data.max_number) == parseInt(datausrup.result)) && parseInt(dataup.number_players_done) >= 2) {
        interaction.editReply({
          content: `لقد حصلت على **${urnum}**
        اصبح مجموعك ${datausrup.result}
        > تهانينا لقد حصلت على الرقم المطلوب و قد تم انهاء دورك`, ehpemeral: true
        })
        let embed_finish_tk_game = new Discord.MessageEmbed()
          .setTitle("بيانات التحدي")
          .setDescription(`اقصى رقم : **${dataup.max_number}**`)
          .addFields({ name: `${stusrgame.tag}`, value: `> Done` }, { name: `${wthusrgame.tag}`, value: `> Done` })
        let button_arkam1 = new MessageButton()
          .setCustomId(`arkam1tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_smaller1} - ${dataup.number_smaller2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let button_finish = new MessageButton()
          .setCustomId(`finishtk_${gdata.msgID}`)
          .setLabel("finish")
          .setStyle("SUCCESS")
          .setDisabled()
        let button_arkam2 = new MessageButton()
          .setCustomId(`arkam2tk_${gdata.msgID}`)
          .setLabel(`${dataup.number_greater1} - ${dataup.number_greater2}`)
          .setStyle("PRIMARY")
          .setDisabled()
        let row = new MessageActionRow()
          .setComponents(button_arkam1, button_finish, button_arkam2)
        client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game], content: `> انتهى التحدي...`, components: [row] })).catch(err => console.error(err))
        setTimeout(async () => {
          if (parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) > parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) < parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) || (parseInt(datausrtk1.result) == parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `${stusrgame} **/** ${wthusrgame} تعادل !\nاللعبة: **الرقم التقريبي**, المبلغ: **${parseInt(gdata.coins).toLocaleString()}**`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if (parseInt(dataup.max_number) > parseInt(datausrtk1.result) && parseInt(dataup.max_number) < parseInt(datausrtk2.result)) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk1.result)) && (parseInt(datausrtk1.result) > parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

> الـ ** خـآسر ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) + parseInt(total)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) - parseInt(gdata.coins)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
          if ((parseInt(dataup.max_number) >= parseInt(datausrtk2.result)) && (parseInt(datausrtk1.result) < parseInt(datausrtk2.result))) {
            let embed_finish_tk_game_tm = new Discord.MessageEmbed()
              .setTitle("بيانات التحدي")
              .setDescription(`اقصى رقم : **${dataup.max_number}**`)
              .addFields({ name: `${stusrgame.tag}`, value: `> ${datausrtk1.numbers.join(" + ") || ""} = **${datausrtk1.result || 0}**` }, { name: `${wthusrgame.tag}`, value: `> ${datausrtk2.numbers.join(" + ") || ""} = **${datausrtk2.result || 0}**` })
            client.channels.cache.get(interaction.channel.id).messages.fetch(gdata.msgID).then(msg1 => msg1.edit({ embeds: [embed_finish_tk_game_tm], content: `> الـ ** فـآئز ** : ${wthusrgame} - بـ ** مجموع ** : ${datausrtk2.result}

> الـ ** خـآسر ** : ${stusrgame} - بـ ** مجموع ** : ${datausrtk1.result}

الـ ** لعبة ** : الـرقم تقريبي .! - الـ ** 💸 - مبلغ ** : ${parseInt(gdata.coins).toLocaleString()} .!`, components: [] })).catch(err => console.error(err))
            let datacoinsusr1st = await db.findOne({
              id: stusrgame.id
            })
            if (!datacoinsusr1st) {
              datacoinsusr1st = await db.create({
                id: stusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            datacoinsusr1st.coins = parseInt(datacoinsusr1st.coins) - parseInt(gdata.coins)
            await datacoinsusr1st.save()
            let datacoinsusr2st = await db.findOne({
              id: wthusrgame.id
            })
            if (!datacoinsusr2st) {
              datacoinsusr = await db.create({
                id: wthusrgame.id,
                coins: 0,
                status_playing: "no"
              })
            }
            let tax = parseInt(gdata.coins) * 0.04;
            let total = parseInt(gdata.coins) - parseInt(tax);
            datacoinsusr2st.coins = parseInt(datacoinsusr2st.coins) + parseInt(total)
            await datacoinsusr2st.save()
            datacoinsusr1st.status_playing = "no"
            await datacoinsusr1st.save()
            datacoinsusr2st.status_playing = "no"
            await datacoinsusr2st.save()
            await takribi.findOneAndDelete({
              msgID: gdata.msgID,
              idstusr: stusrgame.id
            })
            await tkusr.findOneAndDelete({
              id: stusrgame.id,
              msgID: interaction.message.id
            })
            await tkusr.findOneAndDelete({
              id: wthusrgame.id,
              msgID: interaction.message.id
            })
            await game.findOneAndDelete({
              id: stusrgame.id,
              with: wthusrgame.id,
              msgID: interaction.message.id
            })
            return;
          }
        }, 1500)
        return;
      }
      return interaction.editReply({
        content: `لقد حصلت على **${urnum}**
       اصبح مجموعك ${datausrup.result}
       ||تنبيه: انتبه ان يصبح مجموعك اعلى من الرقم المطلوب, يمكنك انهاء دورك بالضغط على الزر الاخضر||`, ephemeral: true
      })
    }
  }
})






function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

